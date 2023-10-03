import { Link, Outlet, useMatch, useParams } from "react-router-dom"
import { useTickets } from "../hooks/useTickets"
import StatusIndicator from "../components/statusIndicator"
import PriorityIndicator from "../components/priorityIndicator"
import AssigneeIndicator from "../components/assigneeIndicator"

export default function ProjectView() {
    const { teamId, projectId, ticketId } = useParams()
    const { status, data: tickets, error, isFetching } = useTickets()

    return (
        <div className="flex flex-row">
            <div className="p-4 w-full flex-1">
                <Link to={`/${teamId}/${projectId}/create-ticket`}>
                    <div className="mb-1 font-bold text-gray-800 items-center px-4 py-2">
                        + New ticket
                    </div>
                </Link>
                {tickets && (
                    <div className="flex flex-col gap-2">
                        {tickets.map((ticket, index) => (
                            <TicketLink
                                key={index}
                                to={`/${teamId}/${projectId}/${ticket.id}`}
                            >
                                <div className="flex gap-2">
                                    <div className="font-bold">{`${ticket.project.abbreviation}-${ticket.identifier}`}</div>
                                    <div>{ticket.name}</div>
                                </div>
                                <div className="flex gap-2">
                                    <StatusIndicator
                                        statusId={ticket.statusId}
                                    />
                                    <PriorityIndicator
                                        priorityId={ticket.priorityId}
                                    />
                                    <AssigneeIndicator
                                        assigneeId={ticket.assigneeId}
                                    />
                                </div>
                            </TicketLink>
                        ))}
                    </div>
                )}
            </div>
            <div className="p-4 flex-1">
                <Outlet />
            </div>
        </div>
    )
}

type TicketLinkProps = {
    to: string
    children: React.ReactNode
}

function TicketLink({ to, children }: TicketLinkProps) {
    const match = useMatch(`${to}*`)
    return (
        <Link to={to}>
            {match ? (
                <div className="flex justify-between flex-row gap-4 border border-black items-center px-4 py-2 bg-blue-500 text-white rounded shadow-90s-small translate-x-[-1px] translate-y-[-2px]">
                    {children}
                </div>
            ) : (
                <div className="hover:opacity-80 flex justify-between flex-row gap-4 border border-black items-center px-4 py-2 bg-white rounded ">
                    {children}
                </div>
            )}
        </Link>
    )
}
