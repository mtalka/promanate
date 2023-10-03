import { useParams } from "react-router-dom";
import { useApi } from "./useApi";
import { useQuery } from "@tanstack/react-query";
import { fetchPriorities } from "../utils/api";

export default function usePriorities() {
    const { teamId } = useParams();
    const apiClient = useApi()
    return useQuery(['priorities', teamId], () => fetchPriorities(apiClient, teamId ?? ""))
}