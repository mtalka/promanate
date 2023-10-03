import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./views/layout"
import Navbar from "./components/navbar"
import { useAuth0 } from "@auth0/auth0-react"
import ProjectPicker from "./views/projectPicker"
import ProjectView from "./views/projectView"
import TicketView from "./views/ticketView"
import CreateTeam from "./views/createTeam"
import CreateProject from "./views/createProject"
import CreateTicket from "./views/createTicket"
import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query"
import toast from "react-hot-toast"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function App() {
    const { isAuthenticated } = useAuth0()
    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: (error: any) =>
                toast.error(`Something went wrong: ${error.message}`),
        }),
    })

    return (
        <main className="bg-gray-50 text-sm min-h-screen">
            <Router>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    {isAuthenticated ? (
                        <Routes>
                            <Route path="/" element={<Layout />} />
                            <Route
                                path="create-team"
                                element={<CreateTeam />}
                            />
                            <Route path=":teamId" element={<ProjectPicker />}>
                                {/* <Route path="/" element={} /> */}
                                <Route
                                    path="create-project"
                                    element={<CreateProject />}
                                />
                                <Route
                                    path=":projectId"
                                    element={<ProjectView />}
                                >
                                    <Route
                                        path="create-ticket"
                                        element={<CreateTicket />}
                                    />
                                    <Route
                                        path=":ticketId"
                                        element={<TicketView />}
                                    />
                                </Route>
                            </Route>
                        </Routes>
                    ) : (
                        <div>Not logged in</div>
                    )}
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </Router>
        </main>
    )
}
