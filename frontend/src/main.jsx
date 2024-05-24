import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
			<BrowserRouter>
				<SnackbarProvider
					autoHideDuration={1500}
					maxSnack={1}
					preventDuplicate
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
				>
					<App />
				</SnackbarProvider>
			</BrowserRouter>
	</React.StrictMode>
);