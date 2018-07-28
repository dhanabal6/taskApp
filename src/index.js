import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import registerServiceWorker from "./registerServiceWorker";
const muiTheme = getMuiTheme({
	palette: {
		primary1Color: "#00bc8e",
		accent1Color: "#dc3545"
	}
});

ReactDOM.render(
	<MuiThemeProvider muiTheme={muiTheme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</MuiThemeProvider>,
	document.getElementById("root")
);
registerServiceWorker();
