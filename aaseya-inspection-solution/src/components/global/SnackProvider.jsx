import { Alert, Snackbar, Stack } from "@mui/material";
import { createContext, useState } from "react";

export const SnackContext = createContext();

export const SnackProvider = ({ children }) => {
    const [ snack, setSnack ] = useState({
        open: false
    })

    const closeSnack = () => {
        setSnack({
            open: false
        })
    }

    return (
        <SnackContext.Provider value={{ snack, setSnack }}>
            <Stack spacing={2} sx={{ width: '100%' }}>
				<Snackbar open={snack?.open} autoHideDuration={snack.timeOut || 9000} onClose={closeSnack} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
                    <Alert onClose={closeSnack} variant="filled" severity={snack?.severity} sx={{ width: '100%' }}>
						{snack?.message}
					</Alert>
				</Snackbar>
			</Stack>
            {children}
        </SnackContext.Provider>
    )
}