import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { AppProvider } from "./providers";

ReactDOM.render(
  <React.StrictMode>
    {/*<ColorModeScript />*/}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
