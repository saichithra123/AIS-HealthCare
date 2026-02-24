 
// import { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Stack,
//   Button,
//   IconButton,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import SendIcon from "@mui/icons-material/Send";
// import chatbotIcon from "../assets/noun-chatbot-6794264.svg";
 
// function UploadDocumentsCard({
//   medicalFile,
//   diagnosticFile,
//   setMedicalFile,
//   setDiagnosticFile,
//   showError,
// }) {
//   return (
//     <Paper sx={{ p: 2, borderRadius: 2 }}>
//       {showError && (!medicalFile || !diagnosticFile) && (
//         <Paper
//           sx={{
//             p: 1.5,
//             mb: 1.5,
//             backgroundColor: "#FDECEA",
//             border: "1px solid #F5C2C7",
//           }}
//         >
//           <Typography fontSize={12} color="#D32F2F">
//             We noticed form is missing. Please upload to continue.
//           </Typography>
//         </Paper>
//       )}
 
//       {/* MEDICAL FORM */}
//       <Paper variant="outlined" sx={{ p: 1.5, mb: 1.5, display: "flex", justifyContent: "space-between" }}>
//         <Box>
//           <Typography fontSize={14} fontWeight={600}>Medical Form</Typography>
//           <Typography fontSize={12} color={medicalFile ? "#2E7D32" : "text.secondary"}>
//             {medicalFile ? "UPLOADED" : "PENDING"}
//           </Typography>
//         </Box>
//         <Button component="label" variant="outlined" size="small">
//           {medicalFile ? "Change" : "Choose File"}
//           <input
//             hidden
//             type="file"
//             onChange={(e) => setMedicalFile(e.target.files[0])}
//           />
//         </Button>
//       </Paper>
 
//       {/* DIAGNOSTIC REPORT */}
//       <Paper variant="outlined" sx={{ p: 1.5, display: "flex", justifyContent: "space-between" }}>
//         <Box>
//           <Typography fontSize={14} fontWeight={600}>Diagnostic Report</Typography>
//           <Typography fontSize={12} color={diagnosticFile ? "#2E7D32" : "text.secondary"}>
//             {diagnosticFile ? "UPLOADED" : "PENDING"}
//           </Typography>
//         </Box>
//         <Button component="label" variant="outlined" size="small">
//           {diagnosticFile ? "Change" : "Choose File"}
//           <input
//             hidden
//             type="file"
//             onChange={(e) => setDiagnosticFile(e.target.files[0])}
//           />
//         </Button>
//       </Paper>
//     </Paper>
//   );
// }
 
// function HospitalForm({ onSubmit }) {
//   const [treatmentType, setTreatmentType] = useState("Planned");
//   const [treatmentNature, setTreatmentNature] = useState("Surgical");
//   const [hospitalName, setHospitalName] = useState("");
//   const [estimatedCost, setEstimatedCost] = useState("");
 
//   return (
//     <Paper sx={{ p: 2.5, borderRadius: 2 }}>
//       <Typography fontWeight={600} mb={2}>
//         Hospital & Treatment Details
//       </Typography>
 
//       <Typography fontSize={13}>Treatment Type</Typography>
//       <RadioGroup
//         row
//         value={treatmentType}
//         onChange={(e) => setTreatmentType(e.target.value)}
//       >
//         <FormControlLabel value="Planned" control={<Radio />} label="Planned" />
//         <FormControlLabel value="Emergency" control={<Radio />} label="Emergency" />
//       </RadioGroup>
 
//       <Typography fontSize={13} mt={2}>Treatment Nature</Typography>
//       <RadioGroup
//         row
//         value={treatmentNature}
//         onChange={(e) => setTreatmentNature(e.target.value)}
//       >
//         <FormControlLabel value="Surgical" control={<Radio />} label="Surgical" />
//         <FormControlLabel value="Non-Surgical" control={<Radio />} label="Non-Surgical" />
//       </RadioGroup>
 
//       <Typography fontSize={14} mt={2} mb={0.5}>
//         Hospital Name
//       </Typography>
//       <TextField
//         fullWidth
//         size="small"
//         value={hospitalName}
//         onChange={(e) => setHospitalName(e.target.value)}
//       />
//       <Typography fontSize={14} mt={2} mb={0.5}>
//         Estimated Cost
//       </Typography>
//       <TextField
//         fullWidth
//         size="small"
//         value={estimatedCost}
//         onChange={(e) => setEstimatedCost(e.target.value)}
//       />
//     </Paper>
//   );
// }
 
// function DetailRow({ label, value, highlight }) {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <Typography
//         sx={{ fontSize: 13, color: "#6B7280" }}
//       >
//         {label}
//       </Typography>
//       {highlight ? (
//         <Box
//           sx={{
//             px: 1.2,
//             py: 0.3,
//             borderRadius: 1.5,
//             backgroundColor: "#E6F4EA",
//             color: "#2E7D32",
//             fontSize: 12,
//             fontWeight: 600,
//           }}
//         >
//           {value}
//         </Box>
//       ) : (
//         <Typography
//           sx={{ fontSize: 13, fontWeight: 600 }}
//         >
//           {value}
//         </Typography>
//       )}
//     </Box>
//   );
// }
 
// function ChatBubble({
//   msg,
//   medicalFile,
//   diagnosticFile,
//   setMedicalFile,
//   setDiagnosticFile,
//   showUploadError,
// }) {
//   const policyDetails = msg.policyDetails;
// if (msg.typeCard === "PRE_APPROVAL_STATUS" && msg.preApproval) {
//   const p = msg.preApproval;
 
//   return (
//     <Paper sx={{ p: 2.5 }}>
//       <Typography fontWeight={600} mb={1} color="#4F8787">
//         Pre-Approval Status
//       </Typography>
 
//       {/* BASIC DETAILS */}
//       <Stack spacing={1}>
//         <DetailRow label="Case ID" value={p.caseId} />
//         <DetailRow label="Hospital Name" value={p.hospitalName} />
//         <DetailRow label="Treatment Type" value={p.treatmentType} />
//         <DetailRow label="Submission Date" value={p.submissionDate} />
//         <DetailRow label="Status" value={p.status} highlight />
//       </Stack>
 
//       {/* ================= APPROVED ================= */}
//       {p.status === "Approved" && (
//         <Paper
//           variant="outlined"
//           sx={{
//             p: 1.5,
//             mt: 2,
//             backgroundColor: "#E6F4EA",
//             borderColor: "#2E7D32",
//           }}
//         >
//           <Typography fontWeight={600} color="#2E7D32" mb={1}>
//             Approval Details
//           </Typography>
 
//           <Stack spacing={1}>
//             <DetailRow label="Approved Amount" value={p.approvedAmount} />
//             <DetailRow label="Validity Period" value={p.validityPeriod} />
//             <DetailRow label="Hospital Name" value={p.hospitalName} />
//           </Stack>
//         </Paper>
//       )}
 
//       {/* ================= REJECTED ================= */}
//       {p.status === "Rejected" && (
//         <Paper
//           variant="outlined"
//           sx={{
//             p: 1.5,
//             mt: 2,
//             backgroundColor: "#FDECEA",
//             borderColor: "#D32F2F",
//           }}
//         >
//           <Typography fontWeight={600} color="#D32F2F" mb={1}>
//             Rejection Reason
//           </Typography>
 
//           <Typography fontSize={13}>
//             {p.rejectionReason}
//           </Typography>
//         </Paper>
//       )}
//     </Paper>
//   );
// }
//   if (msg.accessRestricted) {
//     return (
//       <Box sx={{ alignSelf: "flex-start", maxWidth: "90%" }}>
//         <Paper
//           sx={{
//             p: 2.5,
//             backgroundColor: "#FDECEA",
//             borderRadius: 2,
//             border: "1px solid #F5C2C7",
//           }}
//         >
//           <Typography
//             fontWeight={700}
//             sx={{ color: "#D32F2F", mb: 1 }}
//           >
//             Access Restricted
//           </Typography>
//           <Typography fontSize={13} sx={{ mb: 2 }}>
//             Verification has failed multiple times.
//             Please contact customer support or try again later.
//           </Typography>
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{
//               backgroundColor: "#D32F2F",
//               textTransform: "none",
//             }}
//           >
//             Call Support
//           </Button>
//         </Paper>
//       </Box>
//     );
//   }
 
//   // IDENTITY_VERIFIED
//   if (msg.typeCard === "IDENTITY_VERIFIED" && policyDetails) {
//     return (
//       <Box sx={{ alignSelf: "flex-start", maxWidth: "100%" }}>
//         <Box
//           sx={{
//             backgroundColor: "#EAF4F4",
//             p: 2,
//             borderRadius: 2,
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: 14,
//               fontWeight: 600,
//               color: "#4F8787",
//               mb: 1.5,
//             }}
//           >
//             Identity Verified Successfully
//           </Typography>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 2,
//               borderRadius: 2,
//               border: "1px solid #E5E7EB",
//               backgroundColor: "#FFFFFF",
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: 13,
//                 fontWeight: 500,
//                 color: "#4F8787",
//                 mb: 1.5,
//               }}
//             >
//               Policy Details
//             </Typography>
//             <Stack spacing={1}>
//               <DetailRow
//                 label="Policy Number"
//                 value={policyDetails.policyNumber}
//               />
//               <DetailRow label="SSN" value={policyDetails.ssn} />
//               <DetailRow
//                 label="Policy Status"
//                 value={policyDetails.status}
//                 highlight
//               />
//               <DetailRow
//                 label="Policy Type"
//                 value={policyDetails.type}
//               />
//             </Stack>
//             <Box
//               sx={{
//                 height: 1,
//                 backgroundColor: "#E5E7EB",
//                 my: 1.5,
//               }}
//             />
//             <Typography
//               sx={{
//                 fontSize: 13,
//                 fontWeight: 600,
//                 color: "#4F8787",
//                 mb: 0.5,
//               }}
//             >
//               Covered Members
//             </Typography>
//             <Stack spacing={0.4}>
//               {policyDetails.members.map((m, i) => (
//                 <Typography key={i} sx={{ fontSize: 13 }}>
//                   {m}
//                 </Typography>
//               ))}
//             </Stack>
//           </Paper>
//         </Box>
//       </Box>
//     );
//   }
 
//   if (msg.typeCard === "DIAGNOSIS") {
//     const d = msg.diagnosis;
//     return (
//       <Paper sx={{ p: 2.5 }}>
//         <Stack direction="row" justifyContent="space-between" mb={1}>
//           <Typography
//             sx={{
//               fontSize: 13,
//               fontWeight: 600,
//               color: "#4F8787",
//               mb: 0.5,
//             }}
//           >
//             Diagnosis Analysis
//           </Typography>
//           <Box
//             sx={{
//               px: 1.5,
//               py: 0.3,
//               borderRadius: 10,
//               fontSize: 12,
//               fontWeight: 600,
//               backgroundColor: "#E6F4EA",
//               color: "#2E7D32",
//             }}
//           >
//             {d.status}
//           </Box>
//         </Stack>
//         <Typography fontSize={14}>
//           {d.name}, {d.icd}
//         </Typography>
//         <Typography fontSize={12} mt={1}>
//           Confidence Score: {d.confidence}%
//         </Typography>
//         <Box
//           sx={{
//             height: 6,
//             backgroundColor: "#E5E7EB",
//             borderRadius: 4,
//             mt: 1,
//           }}
//         >
//           <Box
//             sx={{
//               width: `${d.confidence}%`,
//               height: "100%",
//               backgroundColor: "#4F8787",
//               borderRadius: 4,
//             }}
//           />
//         </Box>
//       </Paper>
//     );
//   }
 
//   if (msg.typeCard === "HOSPITAL_FORM") {
//     return <HospitalForm onSubmit={msg.onSubmit} />;
//   }
 
//   if (msg.typeCard === "UPLOAD_DOCUMENTS") {
//     return (
//       <UploadDocumentsCard
//         medicalFile={medicalFile}
//         diagnosticFile={diagnosticFile}
//         setMedicalFile={setMedicalFile}
//         setDiagnosticFile={setDiagnosticFile}
//         showError={showUploadError}
//       />
//     );
//   }
 
//   if (msg.typeCard === "EXISTING_CLAIM_STATUS") {
//     const c = msg.claimDetails;
//     return (
//       <Paper sx={{ p: 2.5 }}>
//         <Stack direction="row" justifyContent="space-between" mb={1}>
//           <Typography fontWeight={600} color="#4F8787">
//             Claim for Review
//           </Typography>
//           <Box
//             sx={{
//               px: 1.5,
//               py: 0.3,
//               borderRadius: 10,
//               fontSize: 12,
//               fontWeight: 600,
//               backgroundColor: "#E6F4EA",
//               color: "#2E7D32",
//             }}
//           >
//             {c.status}
//           </Box>
//         </Stack>
//         <Stack spacing={1}>
//           <DetailRow label="Case ID" value={c.referenceId} />
//           <DetailRow label="Policy Number" value={c.policyNumber} />
//           <DetailRow label="Patient Name" value={c.patientName} />
//           <DetailRow label="Stage" value={c.stage} highlight />
//         </Stack>
//       </Paper>
//     );
//   }
 
//   // Default message bubble
//   return (
//     <Box
//       sx={{
//         alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
//         backgroundColor: msg.type === "user" ? "#4F8787" : "#fff",
//         color: msg.type === "user" ? "#fff" : "#000",
//         px: 2,
//         py: 1,
//         borderRadius: 2,
//         maxWidth: "80%",
//       }}
//     >
//       {msg.text}
//     </Box>
//   );
// }
 
// export default function Chatbot({ onClose, conversationId })   {
// const [stage, setStage] = useState("WELCOME"); // WELCOME | POLICY | MEDICAL | DONE
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [attempts, setAttempts] = useState(0);
//   const bottomRef = useRef(null);
//   const [isTyping, setIsTyping] = useState(false);
 
//   const [medicalFile, setMedicalFile] = useState(null);
//   const [diagnosticFile, setDiagnosticFile] = useState(null);
//   const [showUploadError, setShowUploadError] = useState(false);
 
//   const botReplyWithTyping = (callback, delay = 2000) => {
//     setIsTyping(true);
//     setTimeout(() => {
//       setIsTyping(false);
//       callback();
//     }, delay);
//   };
 
//   const MAX_ATTEMPTS = 3;
 
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);
 
// const startExistingPreClaim = () => {
//   botReplyWithTyping(() => {
//     setMessages([
//       {
//         type: "bot",
//         text:
//           "Hello! I can help you check the status of your pre-approval request.\n" +
//           "Please enter Policy Number and Pre-Approval Case ID.",
//       },
//     ]);
//     setStage("EXISTING_CLAIM");
//   }, 2000);
// };
//   const startPreClaim = () => {
//     botReplyWithTyping(() => {
//       setMessages([
//         { type: "bot", text: "Please enter Policy No, SSN and Patient Name" },
//       ]);
//       setStage("POLICY");
//     }, 2000);
//   };
 
//   const validatePolicyInput = (text) => {
//     const parts = text.split(",").map((p) => p.trim());
//     if (parts.length < 3) return false;
 
//     const policyRegex = /^US-AETNA-\d{8}$/;
//     const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
 
//     return policyRegex.test(parts[0]) && ssnRegex.test(parts[1]);
//   };
 
//  const validatePreApprovalInput = (text) => {
//   const parts = text.split(",").map(p => p.trim());
//   if (parts.length !== 2) return false;
 
//   const policyRegex = /^US-AETNA-\d{8}$/;
//   const caseRegex = /^\d{16}$/;
 
//   return policyRegex.test(parts[0]) && caseRegex.test(parts[1]);
// };
 
//   const handleSend = () => {
//     if (stage === "UPLOAD") {
//       if (!medicalFile || !diagnosticFile) {
//         setShowUploadError(true);
//         return;
//       }
//       // ✅ BOTH FILES UPLOADED → AUTO SUBMIT / CREATE CASE
//       setMessages((p) => [
//         ...p,
//         {
//           type: "bot",
//           text: "Your pre-claim request has been successfully initiated.",
//         },
//       ]);
//       setStage("DONE");
//       return;
//     }
 
//     if (!input.trim()) return;
 
//     const userText = input;
//     setInput("");
//     setMessages((prev) => [...prev, { type: "user", text: userText }]);
 
//     /* -------- POLICY STAGE -------- */
//     if (stage === "POLICY") {
//       const valid = validatePolicyInput(userText);
 
//       if (!valid) {
//         const next = attempts + 1;
//         setAttempts(next);
 
//         if (next >= MAX_ATTEMPTS) {
//           setMessages((p) => [...p, { type: "bot", accessRestricted: true }]);
//           setStage("DONE");
//         } else {
//           setMessages((p) => [
//             ...p,
//             { type: "bot", text: "Please enter a valid policy number" },
//           ]);
//         }
//         return;
//       }
 
//       const parts = userText.split(",").map((p) => p.trim());
 
//       botReplyWithTyping(() => {
//         setMessages((p) => [
//           ...p,
//           {
//             type: "bot",
//             typeCard: "IDENTITY_VERIFIED",
//             policyDetails: {
//               policyNumber: parts[0],
//               ssn: parts[1],
//               status: "Active",
//               type: "Family Floater",
//               members: [`${parts[2]} (Self)`, "Spouse", "Child"],
//             },
//           },
//         ]);
 
//         botReplyWithTyping(() => {
//           setMessages((p) => [
//             ...p,
//             {
//               type: "bot",
//               text:
//                 "Please describe your medical condition.\nDiagnosis/Disease name\nICD-10 code(s)",
//             },
//           ]);
//           setStage("MEDICAL");
//         }, 2000);
//       });
 
//       return;
//     }
 
//     /* -------- EXISTING PRE-CLAIM -------- */
// if (stage === "EXISTING_CLAIM") {
//   const valid = validatePreApprovalInput(userText);
 
//   if (!valid) {
//     setMessages(p => [
//       ...p,
//       {
//         type: "bot",
//         text:
//           "The details provided are invalid. Please check and re-enter your Policy Number and Pre-Approval Case ID.",
//       },
//     ]);
//     return;
//   }
 
//   const [policyNumber, caseId] = userText.split(",").map(p => p.trim());
 
//   botReplyWithTyping(() => {
//     setMessages(p => [
//       ...p,
//       { type: "bot", text: "Fetching your pre-approval request details..." },
//     ]);
 
//     // 🔽 Simulating backend response
//     botReplyWithTyping(() => {
//       const dummyResponse = {
//         caseId,
//         hospitalName: "Apollo Hospitals",
//         treatmentType: "Planned Surgery",
//         submissionDate: "14 Feb 2026",
 
//         // 👉 CHANGE THIS VALUE TO TEST DIFFERENT FLOWS
//         status: "Rejected", // Approved | Rejected | Under Medical Review
 
//         // Approved-only
//         approvedAmount: "₹2,50,000",
//         validityPeriod: "30 Days",
 
//         // Rejected-only
//         rejectionReason: "Requested treatment is not covered under your policy",
//       };
 
//       setMessages(p => [
//         ...p,
//         {
//           type: "bot",
//           typeCard: "PRE_APPROVAL_STATUS",
//           preApproval: dummyResponse,
//         },
//       ]);
//       setStage("DONE");
//     }, 2000);
//   }, 1500);
 
//   return;
// }    if (stage === "MEDICAL") {
//       botReplyWithTyping(() => {
//         setMessages((p) => [
//           ...p,
//           {
//             type: "bot",
//             typeCard: "DIAGNOSIS",
//             diagnosis: {
//               confidence: 87,
//               status: "Eligible",
//               name: "Diabetes Mellitus",
//               icd: "E11.9"
//             },
//           },
//         ]);
 
//         // Ask next question
//         botReplyWithTyping(() => {
//           setMessages((p) => [
//             ...p,
//             {
//               type: "bot",
//               text: "Please provide the hospital and treatment details",
//             },
//             {
//               type: "bot",
//               typeCard: "HOSPITAL_FORM",
//             },
//             {
//               type: "bot",
//               text: "Everything looks good! Please upload your documents.",
//             },
//             {
//               type: "bot",
//               typeCard: "UPLOAD_DOCUMENTS",
//             }
//           ]);
//           setStage("UPLOAD");
//         }, 2000);
//       }, 3000);
 
//       return;
//     }
//   };
 
//   return (
//     <>
//       {/* BACKDROP */}
//       <Box
//         sx={{
//           position: "fixed",
//           inset: 0,
//           backdropFilter: "blur(6px)",
//           backgroundColor: "rgba(0,0,0,0.15)",
//           zIndex: 2000,
//         }}
//       />
 
//       {/* CHAT WINDOW */}
//       <Paper
//         elevation={8}
//         sx={{
//           position: "fixed",
//           right: 40,
//           top: "50%",
//           transform: "translateY(-50%)",
//           width: 460,
//           height: 420,
//           borderRadius: 3,
//           display: "flex",
//           flexDirection: "column",
//           zIndex: 2100,
//         }}
//       >
//         {/* HEADER */}
//         <Box
//           sx={{
//             backgroundColor: "#4F8787",
//             color: "#fff",
//             px: 2,
//             py: 1.5,
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Stack direction="row" spacing={1}>
//             <Box component="img" src={chatbotIcon} sx={{ width: 24 }} />
//             <Box>
//               <Typography fontWeight={600}>Aaseya AI</Typography>
//               <Typography fontSize={11}>Online Support</Typography>
//             </Box>
//           </Stack>
//           <IconButton onClick={onClose}>
//             <CloseIcon sx={{ color: "#fff" }} />
//           </IconButton>
//         </Box>
 
//         {/* CHAT BODY */}
//         <Box
//           sx={{
//             flex: 1,
//             p: 2,
//             backgroundColor: "#F4F7F7",
//             overflowY: "auto",
//             display: "flex",
//             flexDirection: "column",
//             gap: 1,
//           }}
//         >
//          {stage === "WELCOME" && (
//   <Paper sx={{ p: 4 }}>
//     <Typography fontWeight={600}>
//       Hi! I can help you start a pre-claim approval or check an existing request.
//     </Typography>
 
//     <Stack spacing={2} mt={3}>
//       <Button
//         fullWidth
//         variant="contained"
//         sx={{
//           backgroundColor: "#4F8787",
//           color:"#fff",
//           borderRadius: "999px",   // ✅ pill shape
//           textTransform: "none",   // optional: keeps text clean
//           py: 1.2,  
//            fontWeight: 600,              // optional: better height like XD
//         }}
//         onClick={startPreClaim}
//       >
//         Initiate New Pre-Claim
//       </Button>
 
//       <Button
//         fullWidth
//         variant="outlined"
//         sx={{
//           borderColor: "#4F8787",
//           color: "#4F8787",
//           borderRadius: "999px",   // ✅ pill shape
//           textTransform: "none",
//           py: 1.2,
//            fontWeight: 600,
//         }}
//         onClick={startExistingPreClaim}
//       >
//         Check Existing Pre-Claim Status
//       </Button>
//     </Stack>
//   </Paper>
// )}
 
//           {messages.map((msg, i) => (
//             <ChatBubble
//               key={i}
//               msg={msg}
//               medicalFile={medicalFile}
//               diagnosticFile={diagnosticFile}
//               setMedicalFile={setMedicalFile}
//               setDiagnosticFile={setDiagnosticFile}
//               showUploadError={showUploadError}
//             />
//           ))}
         
//           {isTyping && (
//             <Box sx={{ alignSelf: "flex-start" }}>
//               <Paper sx={{ p: 1.2, borderRadius: 2 }}>
//                 <Typography fontSize={13} color="text.secondary">
//                   typing…
//                 </Typography>
//               </Paper>
//             </Box>
//           )}
 
//           <div ref={bottomRef} />
//         </Box>
 
//         {/* INPUT */}
//         {stage !== "WELCOME" && (
//           <Box sx={{ p: 1.5, display: "flex", gap: 1 }}>
//             <TextField
//               fullWidth
//               size="small"
//               placeholder="Type your message…"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <IconButton
//               onClick={handleSend}
//               sx={{ backgroundColor: "#4F8787", color: "#fff" }}
//             >
//               <SendIcon />
//             </IconButton>
//           </Box>
//         )}
//       </Paper>
//     </>
//   );
// }
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
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

export default function Chatbot({ onClose }) {
  const [conversationId, setConversationId] = useState(null);
  const [stage, setStage] = useState("WELCOME");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  /* ================= START CHAT ================= */
  const startChat = async () => {
    try {
      const token = await getAccessToken();

      const res = await fetch(`${BASE_URL}/api/chat/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userMessage: "hi" }),
      });

      if (!res.ok) throw new Error("Start chat failed");

      const data = await res.json();
      setConversationId(data.conversationId);
    } catch (err) {
      console.error("Start Chat Error:", err);
    }
  };

  useEffect(() => {
    startChat();
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

      const token = await getAccessToken();

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

      await fetch(`${BASE_URL}/api/chat/message`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const replyRes = await fetch(
        `${BASE_URL}/api/chat/reply/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!replyRes.ok) throw new Error("Reply failed");

      const replyData = await replyRes.json();

      setMessages((prev) => [...prev, replyData]);
    } catch (err) {
      console.error("Message Error:", err);
    }
  };

  /* ================= HANDLE SEND ================= */
  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [...prev, { type: "user", text: userText }]);

    await sendMessageToBackend(userText);
  };

  /* ================= WELCOME BUTTONS ================= */
  const startPreClaim = async () => {
    setStage("CHAT");
    await sendMessageToBackend(
      "Initiate new pre claim",
      "Initiate new pre claim"
    );
  };

  const startExistingPreClaim = async () => {
    setStage("CHAT");
    await sendMessageToBackend(
      "Check existing pre claim",
      "Check existing pre claim"
    );
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
          width: 460,
          height: 360,
          maxHeight: "85vh",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          zIndex: 2100,
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            backgroundColor: "#4F8787",
            color: "#fff",
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Box component="img" src={chatbotIcon} sx={{ width: 24 }} />
            <Typography fontWeight={600}>Aaseya AI</Typography>
          </Stack>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "#fff" }} />
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
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
              <Typography fontWeight={600}>
                Hi! I can help you start a pre-claim approval or check an
                existing request.
              </Typography>

              <Stack spacing={2} mt={3}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#4F8787",
                    borderRadius: "999px",
                    color: "#fff",
                  }}
                  onClick={startPreClaim}
                >
                  Initiate New Pre-Claim
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: "#4F8787",
                    color: "#4F8787",
                    borderRadius: "999px",
                  }}
                  onClick={startExistingPreClaim}
                >
                  Check Existing Pre-Claim Status
                </Button>
              </Stack>
            </Paper>
          )}

          {messages.map((msg, i) => (
            <Box key={i}>{JSON.stringify(msg)}</Box>
          ))}

          <div ref={bottomRef} />
        </Box>

        {/* INPUT */}
        {stage !== "WELCOME" && (
          <Box sx={{ p: 1.5, display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <IconButton
              onClick={handleSend}
              sx={{ backgroundColor: "#4F8787", color: "#fff" }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        )}
      </Paper>
    </>
  );
}