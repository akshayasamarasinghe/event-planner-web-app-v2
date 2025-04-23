import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {Provider} from "react-redux";
import {store} from "./state/store.ts";
import {MantineProvider} from "@mantine/core";
import {theme} from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <React.StrictMode>
            <MantineProvider withGlobalClasses={true} withCssVariables={true} theme={theme}>
            <App/>
            </MantineProvider>
        </React.StrictMode>
    </Provider>
);
