import { useState } from "react"
import { useApi } from "../hooks/useApi"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTicket } from "../utils/api"
import StatusPicker from "../components/pickers/statusPicker"
import PriorityPicker from "../components/pickers/priorityPicker"
import AssigneePicker from "../components/pickers/assigneePicker"

export default function CreateTicket() {
    const { projectId, teamId } = useParams()
    const [name, setName] = useState("")
    const apiClient = useApi()
    const queryClient = useQueryClient()
    const [statusId, setStatusId] = useState("")
    const [priorityId, setPriorityId] = useState("")
    const [assigneeId, setAssigneeId] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        addTicketMutation.mutateAsync().then(() => {
            setName("")
            setDescription("")
        })
    }

    const addTicketMutation = useMutation({
        mutationFn: () =>
            createTicket(
                apiClient,
                teamId || "",
                projectId || "",
                name,
                statusId,
                priorityId,
                assigneeId,
                description
            ),
        onSuccess(data, variables, context) {
            if (data) {
                navigate(`/${teamId}/${projectId}/${data.id}`)
            }
        },
        onSettled: () => {
            // refetch
            queryClient.invalidateQueries({ queryKey: ["tickets"] })
        },
    })

    function handleChangeStatus(statusId: string) {
        setStatusId(statusId)
    }

    function handleChangePriority(priorityId: string) {
        setPriorityId(priorityId)
    }

    function handleChangeAssignee(assigneeId: string) {
        setAssigneeId(assigneeId)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label>
                Name
                <input
                    className="p-2 border border-black rounded"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Description
                <input
                    className="p-2 border border-black rounded"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <StatusPicker onChange={handleChangeStatus} />
            <PriorityPicker onChange={handleChangePriority} />
            <AssigneePicker onChange={handleChangeAssignee} />
            <button type="submit" value="Create">
                CREATE
            </button>
        </form>
    )
}
