
import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from "../hooks/useApi";

const Profile = () => {
    const apiClient = useApi();
    const { isAuthenticated, user } = useAuth0();
    const loadUserInfo = async () => {
        const response = await apiClient.get("http://localhost:3001/api/user/initial")

        console.log(response);
    }

    return (
        isAuthenticated &&
        user && (
            <div>
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
                <button onClick={() => loadUserInfo()}>Log User</button>
            </div>
        )
    )
}

export default Profile
