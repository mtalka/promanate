import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "../components/loginButton"
import LogoutButton from "../components/logoutButton"
import { Link, useNavigate } from "react-router-dom"
import Button from "./button"
import { useEffect, useState } from "react"
import { TeamSummary } from "../utils/types"
import useTeams from "../hooks/useTeams"

export default function Navbar() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
        useAuth0()
    const {
        status,
        data: teams,
        error,
        isFetching,
    } = useTeams()

    const [currentTeam, setCurrentTeam] = useState<TeamSummary>()
    const navigate = useNavigate()

    useEffect(() => {
        if (teams) {
            // const { teamId } = useParams()
            const teamId = window.location.pathname.split("/")[1]
            const teamToSet = teams?.find((team) => team.id === teamId);
            setCurrentTeam(teamToSet || teams[0])
        }
    }, [teams])

    const handleChange = (event: { target: { value: any } }) => {
        const teamToSet = teams?.find((team) => team.id === event.target.value)
        if (teamToSet) setCurrentTeam(teamToSet)
        navigate(`/${teamToSet?.id}`)
    }

    return (
        <nav className="flex flex-row justify-between border-b border-black px-4 py-2 items-center bg-white">
            <h1>Navbar</h1>
            <div>
                {isAuthenticated && user && currentTeam ? (
                    <div className="flex flex-row gap-8">
                        <div className="flex flex-row gap-4 items-center">
                            <select
                                className="rounded border py-1 px-2 min-w-[200px]"
                                value={currentTeam.id}
                                onChange={handleChange}
                            >
                                {teams?.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                            <Link to="create-team">
                                <Button type="button">New team</Button>
                            </Link>
                        </div>
                        <LogoutButton />
                    </div>
                ) : (
                    <LoginButton />
                )}
            </div>
        </nav>
    )
}
