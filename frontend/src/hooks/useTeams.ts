import { useApi } from "./useApi";
import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "../utils/api";

export default function useTeams() {
    const apiClient = useApi()
    return useQuery(["teams"], () => fetchTeams(apiClient))
}