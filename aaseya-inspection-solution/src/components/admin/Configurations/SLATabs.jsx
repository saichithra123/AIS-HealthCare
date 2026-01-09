import { Stack, Divider, TextField, Typography, Box, useTheme } from "@mui/material";
import React from "react";

function SLATabs({SLAData, setSLAData}) {
	const theme = useTheme();
	const entitySizes = ["Small", "Medium", "Large"];

	const handleInputChange = (size, role, field, value) => {
		setSLAData((prevData) => ({
			...prevData,
			[size]: {
				...prevData[size],
				[role.toLowerCase()]: {
					...prevData[size][role.toLowerCase()],
					[field.toLowerCase()]: value,
				},
			},
		}));
	};

  	return (
    	<form style={{ marginTop: '24px' }}>
			{entitySizes.map((size, index) => (
				<Box
					key={size}
					sx={{
						mb: 2,
						p: 1,
						backgroundColor: theme.palette.colors[1],
						borderRadius: "8px",
					}}
				>
					<Typography sx={{ color: theme.palette.colors[21], fontSize: "14px", mb: 1 }} variant="h4">
						Entity Size: {size}
					</Typography>
					<Stack direction="row" spacing={4}>
						{["Inspector", "Reviewer", "Approver"].map((role) => (
							<Box key={role.toLowerCase()} sx={{ textAlign: "left", width: "33%" }}>
								<Typography variant="body1" sx={{ color: theme.palette.colors[21], mb: 1, fontSize: "12px" }}>
									{role}
								</Typography>
								<Box
									sx={{
										display: "flex",
										border: `1px solid ${theme.palette.colors[22]}`,
										borderRadius: "15px",
										overflow: "hidden",
										width: "100%",
										boxShadow: `inset 0px 3px 6px ${theme.palette.colors[3]}`,
									}}
								>
									<TextField
										variant="outlined"
										placeholder="Goal"
										value={SLAData[size][role.toLowerCase()].goal || ""}
										onChange={(e) => handleInputChange(size, role, "goal", e.target.value)}
										sx={{
											flex: 1,
											borderRight: `1px solid ${theme.palette.colors[22]}`,
											"& fieldset": { border: "none" },
											"& .MuiOutlinedInput-input": {
												padding: "7px 14px",
												fontSize: "12px",
												textAlign: "right",
											},
											"& .MuiOutlinedInput-input::placeholder": {
												color: theme.palette.colors[21],
											},
										}}
									/>
									<TextField
										variant="outlined"
										placeholder="Deadline"
										value={SLAData[size][role.toLowerCase()].deadline || ""}
										onChange={(e) => handleInputChange(size, role, "deadline", e.target.value)}
										sx={{
											flex: 1,
											"& fieldset": { border: "none" },
											"& .MuiOutlinedInput-input": {
												padding: "7px 14px",
												fontSize: "12px",
												textAlign: "right",
											},
											"& .MuiOutlinedInput-input::placeholder": {
												color: theme.palette.colors[21],
											},
										}}
									/>
								</Box>
							</Box>
						))}
					</Stack>
					{index !== entitySizes.length - 1 && (
						<Divider sx={{ mt: 3, borderColor: theme.palette.colors[22], borderWidth: 1 }} />
					)}
				</Box>
			))}
    	</form>
  	);
}

export default SLATabs;
