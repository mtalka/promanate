import { useParams } from "react-router-dom";
import { useApi } from "./useApi";
import { useQuery } from "@tanstack/react-query";
import { fetchStatuses } from "../utils/api";

export default function useStatuses() {
    const { teamId } = useParams();
    const apiClient = useApi()
    return useQuery(['statuses', teamId], () => fetchStatuses(apiClient, teamId ?? ""))
}