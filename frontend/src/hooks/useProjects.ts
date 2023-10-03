import { useParams } from "react-router-dom";
import { useApi } from "./useApi";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../utils/api";

export default function useProjects() {
    const { teamId } = useParams();
    const apiClient = useApi()
    return useQuery(['projects', teamId], () => fetchProjects(apiClient, teamId ?? ""))
}