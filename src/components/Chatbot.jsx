import { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import chatbotIcon from "../assets/noun-chatbot-6794264.svg";

/* ================= TOKEN HELPER ================= */
const getAccessToken = async () => {
  let token = localStorage.getItem("access_token");

  if (token) return token;

  // 🔥 fallback login (QA user – change if needed)
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", import.meta.env.VITE_KEYCLOAK_CLIENT_ID);
  params.append("username", "claimantqa@gmail.com");
  params.append("password", "Camunda@123");

  const TOKEN_URL = `${import.meta.env.VITE_KEYCLOAK_BASE_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/token`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Unable to fetch token");
  }

  localStorage.setItem("access_token", data.access_token);
  return data.access_token;
};

export default function Chatbot({ onClose, conversationId: externalConversationId }) {
  const [conversationId, setConversationId] = useState(externalConversationId || null);
  const [stage, setStage] = useState("WELCOME");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [chatCompleted, setChatCompleted] = useState(false);
  const [preClaimRef, setPreClaimRef] = useState(null);
  const [uploadFiles, setUploadFiles] = useState({ medical: null, diagnostic: null, insurance: null });

  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  /* ================= START CHAT ================= */
  const startChat = async () => {
    try {
      // Chat endpoints are public (no auth required)
      const res = await fetch(`${BASE_URL}/api/chat/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: "hi" }),
      });

      if (!res.ok) throw new Error("Start chat failed");

      const data = await res.json();
      console.log("Chat started, conversationId:", data.conversationId);
      setConversationId(data.conversationId);
    } catch (err) {
      console.error("Start Chat Error:", err);
    }
  };

  useEffect(() => {
    // Only start a new chat if no conversationId was passed as prop
    if (externalConversationId) return;

    // Guard against React StrictMode double-mount
    let cancelled = false;
    const init = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/chat/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: "hi" }),
        });
        if (!res.ok) throw new Error("Start chat failed");
        const data = await res.json();
        if (!cancelled) {
          console.log("Chat started, conversationId:", data.conversationId);
          setConversationId(data.conversationId);
        }
      } catch (err) {
        console.error("Start Chat Error:", err);
      }
    };
    init();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= SEND MESSAGE ================= */
  const sendMessageToBackend = async (userText, selectedOption = null) => {
    try {
      if (!conversationId) {
        console.error("Conversation not ready yet");
        return;
      }

      const formData = new FormData();

      const payload = {
        conversationId,
        userMessage: userText,
        selectedOption,
      };

      formData.append(
        "message",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );

      // Show typing indicator while waiting
      const typingIdx = Date.now();
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Typing...", _typing: typingIdx },
      ]);

      // Chat endpoints are public (no auth required)
      // POST /message blocks until reply is ready (up to 30s) and returns the full reply
      const msgRes = await fetch(`${BASE_URL}/api/chat/message`, {
        method: "POST",
        body: formData,
      });

      if (!msgRes.ok) {
        console.error("Message POST failed:", msgRes.status);
        setMessages((prev) =>
          prev.map((m) =>
            m._typing === typingIdx
              ? { type: "bot", text: "Failed to send message. Please try again." }
              : m
          )
        );
        return;
      }

      // Use POST response directly — it already contains the fresh reply data.
      // Avoids stale Operate data from a separate GET /reply call.
      const replyData = await msgRes.json();

      // Replace typing indicator with actual reply
      const botText = (replyData.text || "Processing your request...").toLowerCase();

      // BPMN conversationState takes highest priority over keyword matching
      const isBpmnUpload = replyData.conversationState === "Uploadthedocuments";

      // Detect upload request (keywords as fallback)
      const isUploadRequest =
        isBpmnUpload ||
        botText.includes("uploading documents") ||
        botText.includes("upload your") ||
        botText.includes("please upload") ||
        botText.includes("documents are uploaded") ||
        botText.includes("medical documents");

      // Detect confirmation keywords (only when NOT an upload request)
      const isConfirmation =
        !isUploadRequest &&
        (botText.includes("do you want to proceed") ||
          botText.includes("ensure all") ||
          botText.includes("would you like to") ||
          botText.includes("shall we proceed") ||
          botText.includes("confirm") ||
          botText.includes("ready to proceed") ||
          botText.includes("do you wish"));

      // Check if this is a terminal/completion message
      const isCompletion =
        replyData.done === true ||
        (replyData.conversationState === "Uploadthedocuments" &&
          botText.includes("proceeding"));

      if (isCompletion) {
        setChatCompleted(true);
        setPreClaimRef(replyData.conversationId || conversationId);
        setShowConfirm(false);
        setShowUpload(false);
      } else if (isUploadRequest) {
        setShowUpload(true);
        setShowConfirm(false);
      } else if (isConfirmation) {
        setShowConfirm(true);
        setShowUpload(false);
      } else {
        setShowConfirm(false);
        setShowUpload(false);
      }

      setMessages((prev) =>
        prev.map((m) =>
          m._typing === typingIdx
            ? {
              type: "bot",
              text: replyData.text || "Processing your request...",
              ...replyData,
            }
            : m
        )
      );
    } catch (err) {
      console.error("Message Error:", err);
      setMessages((prev) => {
        // Remove typing indicator if present, add error message
        const filtered = prev.filter((m) => !m._typing);
        return [
          ...filtered,
          { type: "bot", text: "Something went wrong. Please try again." },
        ];
      });
    }
  };

  /* ================= HANDLE SEND ================= */
  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [...prev, { type: "user", text: userText }]);

    if (stage === "CLAIM_LOOKUP") {
      await lookupClaimStatus(userText.trim());
      return;
    }

    await sendMessageToBackend(userText);
  };

  /* ================= UPLOAD DOCUMENTS ================= */
  const handleFileSelect = (type) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadFiles.medical && !uploadFiles.diagnostic && !uploadFiles.insurance) return;

    const fileNames = [
      uploadFiles.medical?.name,
      uploadFiles.diagnostic?.name,
      uploadFiles.insurance?.name,
    ]
      .filter(Boolean)
      .join(", ");

    setMessages((prev) => [
      ...prev,
      { type: "user", text: `Uploaded: ${fileNames}` },
    ]);
    setShowUpload(false);

    // Send confirmation message with files attached
    const formData = new FormData();
    const payload = {
      conversationId,
      userMessage: "Documents uploaded",
      selectedOption: "Uploadthedocuments",
    };
    formData.append(
      "message",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );
    if (uploadFiles.medical) {
      formData.append("documents", uploadFiles.medical);
    }
    if (uploadFiles.diagnostic) {
      formData.append("documents", uploadFiles.diagnostic);
    }
    if (uploadFiles.insurance) {
      formData.append("documents", uploadFiles.insurance);
    }

    const typingIdx = Date.now();
    setMessages((prev) => [
      ...prev,
      { type: "bot", text: "Typing...", _typing: typingIdx },
    ]);

    try {
      // POST /message blocks until reply is ready and returns fresh data
      const msgRes = await fetch(`${BASE_URL}/api/chat/message`, {
        method: "POST",
        body: formData,
      });

      if (!msgRes.ok) throw new Error("Upload message failed");

      // Use POST response directly — avoids stale Operate data from GET /reply
      const replyData = await msgRes.json();

      // After upload, do NOT re-show the upload panel.
      // conversationState=Uploadthedocuments here means "documents received, proceeding"
      // — NOT "upload more documents". Only show confirm if the reply asks for it.
      const uploadReplyText = (replyData.text || "").toLowerCase();
      if (
        replyData.conversationState === "Uploadthedocuments" ||
        uploadReplyText.includes("proceeding") ||
        replyData.done === true
      ) {
        // Chat flow is complete — pre-claim has been initiated
        setChatCompleted(true);
        setPreClaimRef(replyData.conversationId || conversationId);
        setShowConfirm(false);
        setShowUpload(false);
      } else if (
        uploadReplyText.includes("do you want to proceed") ||
        uploadReplyText.includes("confirm") ||
        uploadReplyText.includes("ready to proceed")
      ) {
        setShowConfirm(true);
      }

      setMessages((prev) =>
        prev.map((m) =>
          m._typing === typingIdx
            ? {
              type: "bot",
              text: replyData.text || "Documents received. Processing...",
              ...replyData,
            }
            : m
        )
      );
    } catch (err) {
      console.error("Upload Error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m._typing === typingIdx
            ? { type: "bot", text: "Failed to upload. Please try again." }
            : m
        )
      );
    }

    setUploadFiles({ medical: null, diagnostic: null, insurance: null });
  };

  /* ================= YES / NO CONFIRMATION ================= */
  const handleConfirm = async (choice) => {
    setShowConfirm(false);
    setMessages((prev) => [...prev, { type: "user", text: choice }]);
    await sendMessageToBackend(choice, choice);
  };

  /* ================= WELCOME BUTTONS ================= */
  const startPreClaim = async () => {
    setStage("CHAT");
    setMessages((prev) => [
      ...prev,
      { type: "user", text: "Initiate new pre claim" },
    ]);
    await sendMessageToBackend(
      "Initiate new pre claim",
      "Initiate new pre claim"
    );
  };

  const startExistingPreClaim = () => {
    setStage("CLAIM_LOOKUP");
    setMessages([
      {
        type: "bot",
        text: "Please provide your Claim ID to check the status.",
      },
    ]);
  };

  /* ================= DIRECT CLAIM LOOKUP ================= */
  const lookupClaimStatus = async (claimId) => {
    const typingIdx = Date.now();
    setMessages((prev) => [
      ...prev,
      { type: "bot", text: "Typing...", _typing: typingIdx },
    ]);

    try {
      const res = await fetch(`${BASE_URL}/api/chat/claim-status/${encodeURIComponent(claimId)}`);
      if (!res.ok) throw new Error(`Lookup failed: ${res.status}`);

      const data = await res.json();

      if (!data.success) {
        setMessages((prev) =>
          prev.map((m) =>
            m._typing === typingIdx
              ? {
                type: "bot",
                text: data.errorCode === "CLAIM_NOT_FOUND"
                  ? "No claim found with that ID. Please check and try again."
                  : `Error: ${data.errorMessage || "Something went wrong."}`,
              }
              : m
          )
        );
        return;
      }

      // Success — show claim status card
      setMessages((prev) =>
        prev.map((m) =>
          m._typing === typingIdx
            ? { type: "bot", text: "", _claimCard: data }
            : m
        )
      );
      setChatCompleted(true);
    } catch (err) {
      console.error("Claim lookup error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m._typing === typingIdx
            ? { type: "bot", text: "Failed to fetch claim status. Please try again." }
            : m
        )
      );
    }
  };

  /* ================= UI ================= */
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.15)",
          zIndex: 2000,
        }}
      />

      <Paper
        elevation={8}
        sx={{
          position: "fixed",
          right: 40,
          top: "50%",
          transform: "translateY(-50%)",
          width: 720,
          height: 600,
          maxHeight: "90vh",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          zIndex: 2100,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#4F8787",
            color: "#fff",
            px: 3,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box component="img" src={chatbotIcon} sx={{ width: 32 }} />
            <Box>
              <Typography fontWeight={700} fontSize={17}>Aaseya AI Assistant</Typography>
              <Typography fontSize={12} sx={{ opacity: 0.85 }}>Online · Healthcare Support</Typography>
            </Box>
          </Stack>
          <IconButton onClick={onClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* BODY */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            backgroundColor: "#F4F7F7",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {stage === "WELCOME" && (
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 2, maxWidth: 480, mx: "auto", mt: 2 }}>
              <Typography fontWeight={700} fontSize={17} mb={0.5}>
                👋 Hi! Welcome to Aaseya AI
              </Typography>
              <Typography fontSize={14} color="text.secondary" mb={3}>
                I can help you start a pre-claim approval or check an existing request.
              </Typography>

              <Stack spacing={2} mt={1}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#4F8787",
                    borderRadius: "999px",
                    color: "#fff",
                    py: 1.5,
                    fontSize: 15,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                  onClick={startPreClaim}
                >
                  🚀 Initiate New Pre-Claim
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "#4F8787",
                    color: "#4F8787",
                    borderRadius: "999px",
                    py: 1.5,
                    fontSize: 15,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                  onClick={startExistingPreClaim}
                >
                  🔍 Check Existing Pre-Claim Status
                </Button>
              </Stack>
            </Paper>
          )}

          {messages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              {/* ---- CLAIM STATUS CARD ---- */}
              {msg._claimCard ? (
                <Box sx={{ width: "100%" }}>
                  <Paper
                    elevation={3}
                    sx={{ borderRadius: 3, overflow: "hidden", width: "100%" }}
                  >
                    {/* Card Header Banner */}
                    <Box
                      sx={{
                        backgroundColor: "#4F8787",
                        px: 3,
                        py: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography fontWeight={700} fontSize={17} color="#fff">
                        🗂️ Claim Status
                      </Typography>
                      <Box
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: 10,
                          fontSize: 14,
                          fontWeight: 700,
                          backgroundColor:
                            msg._claimCard.status === "Approved" ? "#E6F4EA"
                              : msg._claimCard.status === "Rejected" ? "#FDECEA"
                                : "#FFF3E0",
                          color:
                            msg._claimCard.status === "Approved" ? "#2E7D32"
                              : msg._claimCard.status === "Rejected" ? "#D32F2F"
                                : "#E65100",
                        }}
                      >
                        {msg._claimCard.status || "Under Review"}
                      </Box>
                    </Box>

                    {/* Main Details */}
                    <Box sx={{ p: 3 }}>
                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        spacing={0}
                        sx={{ gap: 2, mb: 2 }}
                      >
                        {[
                          { label: "Claim ID", value: msg._claimCard.claimId },
                          { label: "Stage", value: msg._claimCard.stage },
                          { label: "Treatment Type", value: msg._claimCard.treatmentType },
                          { label: "Hospital", value: msg._claimCard.hospitalName },
                          { label: "Diagnosis Code", value: msg._claimCard.diagnosisCode },
                          { label: "Approved Amount", value: msg._claimCard.approvedAmount },
                          { label: "Validity Period", value: msg._claimCard.validityPeriod },
                          {
                            label: "Created",
                            value: msg._claimCard.createdAt
                              ? new Date(msg._claimCard.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit", month: "short", year: "numeric",
                              })
                              : null,
                          },
                        ]
                          .filter((f) => f.value)
                          .map((field) => (
                            <Box
                              key={field.label}
                              sx={{
                                flex: "1 1 calc(50% - 8px)",
                                backgroundColor: "#F0F9F9",
                                borderRadius: 2,
                                px: 2,
                                py: 1.5,
                              }}
                            >
                              <Typography fontSize={12} color="#6B7280" fontWeight={500} mb={0.3}>
                                {field.label}
                              </Typography>
                              <Typography fontSize={15} fontWeight={700} color="#1A3C3E">
                                {field.value}
                              </Typography>
                            </Box>
                          ))}
                      </Stack>

                      {/* Patient Section */}
                      {msg._claimCard.person && (
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            fontSize={13}
                            fontWeight={700}
                            color="#4F8787"
                            textTransform="uppercase"
                            letterSpacing={0.8}
                            mb={1}
                          >
                            👤 Patient
                          </Typography>
                          <Stack direction="row" spacing={2}>
                            {msg._claimCard.person.name && (
                              <Box
                                sx={{
                                  flex: 1,
                                  backgroundColor: "#F0F9F9",
                                  borderRadius: 2,
                                  px: 2,
                                  py: 1.5,
                                }}
                              >
                                <Typography fontSize={12} color="#6B7280" mb={0.3}>Name</Typography>
                                <Typography fontSize={15} fontWeight={700} color="#1A3C3E">
                                  {msg._claimCard.person.name}
                                </Typography>
                              </Box>
                            )}
                            {msg._claimCard.person.ssn && (
                              <Box
                                sx={{
                                  flex: 1,
                                  backgroundColor: "#F0F9F9",
                                  borderRadius: 2,
                                  px: 2,
                                  py: 1.5,
                                }}
                              >
                                <Typography fontSize={12} color="#6B7280" mb={0.3}>SSN</Typography>
                                <Typography fontSize={15} fontWeight={700} color="#1A3C3E">
                                  {msg._claimCard.person.ssn}
                                </Typography>
                              </Box>
                            )}
                          </Stack>
                        </Box>
                      )}

                      {/* Policy Section */}
                      {msg._claimCard.policy && (
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            fontSize={13}
                            fontWeight={700}
                            color="#4F8787"
                            textTransform="uppercase"
                            letterSpacing={0.8}
                            mb={1}
                          >
                            📋 Policy
                          </Typography>
                          <Stack direction="row" spacing={2}>
                            {msg._claimCard.policy.policyNumber && (
                              <Box
                                sx={{
                                  flex: 1,
                                  backgroundColor: "#F0F9F9",
                                  borderRadius: 2,
                                  px: 2,
                                  py: 1.5,
                                }}
                              >
                                <Typography fontSize={12} color="#6B7280" mb={0.3}>Policy Number</Typography>
                                <Typography fontSize={15} fontWeight={700} color="#1A3C3E">
                                  {msg._claimCard.policy.policyNumber}
                                </Typography>
                              </Box>
                            )}
                            {msg._claimCard.policy.sumInsured && (
                              <Box
                                sx={{
                                  flex: 1,
                                  backgroundColor: "#F0F9F9",
                                  borderRadius: 2,
                                  px: 2,
                                  py: 1.5,
                                }}
                              >
                                <Typography fontSize={12} color="#6B7280" mb={0.3}>Sum Insured</Typography>
                                <Typography fontSize={15} fontWeight={700} color="#1A3C3E">
                                  {msg._claimCard.policy.sumInsured}
                                </Typography>
                              </Box>
                            )}
                          </Stack>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Box>
              ) : (
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: "80%",
                    borderRadius: 2.5,
                    backgroundColor:
                      msg.type === "user" ? "#4F8787" : "#F5F5F5",
                    color: msg.type === "user" ? "#fff" : "#333",
                    ...(msg._typing && {
                      "@keyframes pulse": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0.5 },
                      },
                      animation: "pulse 1.5s ease-in-out infinite",
                    }),
                  }}
                >
                  {msg._typing ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={18} sx={{ color: "#4F8787" }} />
                      <Typography fontSize={15} sx={{ color: "#555" }}>
                        Processing your request...
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      fontSize={15}
                      sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.6 }}
                    >
                      {msg.text || ""}
                    </Typography>
                  )}
                </Paper>
              )}
            </Box>
          ))}

          <div ref={bottomRef} />
        </Box>

        {/* UPLOAD DOCUMENTS PANEL */}
        {showUpload && (
          <Paper
            sx={{
              mx: 1.5,
              mb: 1,
              p: 2,
              borderRadius: 2,
              border: "1px dashed #4F8787",
              backgroundColor: "#F0F7F7",
            }}
          >
            <Typography fontSize={13} fontWeight={600} sx={{ mb: 1.5, color: "#355E60" }}>
              Upload Documents
            </Typography>

            {/* Medical Form */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Box>
                <Typography fontSize={13} fontWeight={500}>Medical Form</Typography>
                <Typography fontSize={11} color={uploadFiles.medical ? "#2E7D32" : "text.secondary"}>
                  {uploadFiles.medical ? uploadFiles.medical.name : "No file selected"}
                </Typography>
              </Box>
              <Button
                size="small"
                variant="outlined"
                component="label"
                startIcon={<AttachFileIcon />}
                sx={{ borderColor: "#4F8787", color: "#4F8787", textTransform: "none", fontSize: 12 }}
              >
                Choose
                <input type="file" hidden accept=".pdf,.jpg,.png,.doc,.docx" onChange={handleFileSelect("medical")} />
              </Button>
            </Box>

            {/* Diagnostic Report */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
              <Box>
                <Typography fontSize={13} fontWeight={500}>Diagnostic Report</Typography>
                <Typography fontSize={11} color={uploadFiles.diagnostic ? "#2E7D32" : "text.secondary"}>
                  {uploadFiles.diagnostic ? uploadFiles.diagnostic.name : "No file selected"}
                </Typography>
              </Box>
              <Button
                size="small"
                variant="outlined"
                component="label"
                startIcon={<AttachFileIcon />}
                sx={{ borderColor: "#4F8787", color: "#4F8787", textTransform: "none", fontSize: 12 }}
              >
                Choose
                <input type="file" hidden accept=".pdf,.jpg,.png,.doc,.docx" onChange={handleFileSelect("diagnostic")} />
              </Button>
            </Box>

            {/* Insurance Card */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
              <Box>
                <Typography fontSize={13} fontWeight={500}>Insurance Card</Typography>
                <Typography fontSize={11} color={uploadFiles.insurance ? "#2E7D32" : "text.secondary"}>
                  {uploadFiles.insurance ? uploadFiles.insurance.name : "No file selected"}
                </Typography>
              </Box>
              <Button
                size="small"
                variant="outlined"
                component="label"
                startIcon={<AttachFileIcon />}
                sx={{ borderColor: "#4F8787", color: "#4F8787", textTransform: "none", fontSize: 12 }}
              >
                Choose
                <input type="file" hidden accept=".pdf,.jpg,.png,.doc,.docx" onChange={handleFileSelect("insurance")} />
              </Button>
            </Box>

            <Button
              fullWidth
              variant="contained"
              startIcon={<CloudUploadIcon />}
              disabled={!uploadFiles.medical && !uploadFiles.diagnostic && !uploadFiles.insurance}
              onClick={handleUploadSubmit}
              sx={{
                backgroundColor: "#4F8787",
                textTransform: "none",
                "&:hover": { backgroundColor: "#355E60" },
              }}
            >
              Upload & Continue
            </Button>
          </Paper>
        )}

        {/* YES / NO CONFIRMATION */}
        {showConfirm && (
          <Box sx={{ px: 1.5, pb: 1, display: "flex", gap: 1.5, justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => handleConfirm("Yes")}
              sx={{
                flex: 1,
                backgroundColor: "#4F8787",
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#355E60" },
              }}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleConfirm("No")}
              sx={{
                flex: 1,
                borderColor: "#4F8787",
                color: "#4F8787",
                borderRadius: "999px",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              No
            </Button>
          </Box>
        )}

        {/* COMPLETION BANNER */}
        {chatCompleted && (
          <Box sx={{ p: 2, textAlign: "center", backgroundColor: "#e8f5e9", borderTop: "1px solid #c8e6c9" }}>
            <Typography variant="body2" sx={{ color: "#2e7d32", fontWeight: 600 }}>
              {stage === "CLAIM_LOOKUP"
                ? "Claim details retrieved successfully!"
                : "Pre-claim initiated successfully!"}
            </Typography>
            {preClaimRef && stage !== "CLAIM_LOOKUP" && (
              <Typography variant="body2" sx={{ color: "#2e7d32", mt: 0.5 }}>
                Pre-Claim Reference: <strong>{preClaimRef}</strong>
              </Typography>
            )}
            <Typography variant="caption" sx={{ color: "#558b2f", mt: 0.5, display: "block" }}>
              You can track its status from the dashboard.
            </Typography>
          </Box>
        )}


        {/* INPUT */}
        {stage !== "WELCOME" && !showUpload && !showConfirm && !chatCompleted && (
          <Box sx={{ p: 2, display: "flex", gap: 1.5, borderTop: "1px solid #E0E0E0", backgroundColor: "#fff" }}>
            <TextField
              fullWidth
              size="medium"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "999px" },
                "& input": { fontSize: 15, py: 1.2 },
              }}
            />
            <IconButton
              onClick={handleSend}
              sx={{ backgroundColor: "#4F8787", color: "#fff", width: 48, height: 48, alignSelf: "center", "&:hover": { backgroundColor: "#355E60" } }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        )}
      </Paper>
    </>
  );
}