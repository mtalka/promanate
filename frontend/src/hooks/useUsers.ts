import { useParams } from "react-router-dom";
import { useApi } from "./useApi";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersForTeam } from "../utils/api";

export default function useUsers() {
    const { teamId } = useParams();
    const apiClient = useApi()
    return useQuery(['users', teamId], () => fetchUsersForTeam(apiClient, teamId ?? ""))
}