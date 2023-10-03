import AssigneeIndicator from "../components/assigneeIndicator"
import PriorityIndicator from "../components/priorityIndicator"
import StatusIndicator from "../components/statusIndicator"
import { useTicketById } from "../hooks/useTickets"

export default function TicketView() {
    const { status, data: ticket, error, isFetching } = useTicketById()
    return (
        <div className="">
            {ticket && (
                <div className="flex flex-col gap-2 bg-white border border-black p-4 rounded-lg shadow-90s-large">
                    <div className="font-bold">{ticket.project.abbreviation}-{ticket.identifier}</div>
                    <div className="font-bold">{ticket.name}</div>
                    <div>{ticket.description}</div>
                    <div>{ticket.startDate ? ticket.startDate : ""}</div>
                    <div>{ticket.dueDate ? ticket.dueDate : ""}</div>
                    <StatusIndicator statusId={ticket.statusId} />
                    <PriorityIndicator priorityId={ticket.priorityId} />
                    <AssigneeIndicator assigneeId={ticket.assigneeId} />
                </div>
            )}
        </div>
    )
}
