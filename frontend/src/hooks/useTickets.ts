import { useParams } from "react-router-dom";
import { useApi } from "./useApi";
import { useQuery } from "@tanstack/react-query";
import { fetchTicketById, fetchTickets } from "../utils/api";

export function useTickets() {
    const { teamId, projectId } = useParams();
    const apiClient = useApi();
    return useQuery(['tickets', teamId, projectId], () => fetchTickets(apiClient, teamId ?? "", projectId ?? ""))
}

export function useTicketById() {
    const { teamId, projectId, ticketId } = useParams();
    const apiClient = useApi();
    return useQuery(['tickets', ticketId], () => fetchTicketById(apiClient, teamId ?? "", projectId ?? "", ticketId ?? ""))
}