import { useState } from "react"
import { useApi } from "../hooks/useApi"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProject } from "../utils/api"

export default function CreateProject() {
    const { teamId } = useParams()
    const [name, setName] = useState("")
    const [abbreviation, setAbbreviation] = useState("")
    const apiClient = useApi()
    const queryClient = useQueryClient()

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        addProjectMutation.mutateAsync().then(() => {
            resetForm()
        })
    }

    function resetForm() {
        setName("")
        setAbbreviation("")
    }

    const addProjectMutation = useMutation({
        mutationFn: () =>
            createProject(apiClient, name, abbreviation, teamId || "", ),
        onSettled: () => {
            // refetch
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        },
    })

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Abbreviation:
                <input
                    type="text"
                    value={abbreviation}
                    onChange={(e) => setAbbreviation(e.target.value)}
                />
            </label>
            <button type="submit" value="Create">
                CREATE
            </button>
        </form>
    )
}
