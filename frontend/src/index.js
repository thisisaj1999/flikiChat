import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<SnackbarProvider 
			maxSnack={3}
			preventDuplicate={true}
			autoHideDuration="1000"
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			  }}
		>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</SnackbarProvider>
	</Router>
);
