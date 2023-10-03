import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Auth0Provider } from "@auth0/auth0-react"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Auth0Provider
            domain="makke.eu.auth0.com"
            clientId="95PxfEZOW4TqnatJdRJ0Ug46vBRGV4N9"
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "https://makke.eu.auth0.com/api/v2/",
                scope: "read:current_user update:current_user_metadata",
            }}
        >
            <App />
            <Toaster />
        </Auth0Provider>
    </React.StrictMode>
)
