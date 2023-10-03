import { useEffect } from "react"
import useUsers from "../../hooks/useUsers"

type AssigneePickerProps = {
    assigneeId?: string
    onChange: (assigneeId: string) => void
}


export default function AssigneePicker({ assigneeId, onChange }: AssigneePickerProps) {
    const { status, data: assignees, error, isFetching } = useUsers()

    useEffect(() => {
        if (assignees && assignees.length > 0) {
            if (assigneeId) {
                // if assigneeId is provided, make sure it is valid
                const isValid = assignees.some(assignee => assignee.id === assigneeId);
                if (isValid) {
                    onChange(assigneeId);
                } else {
                    // if it's not valid, choose the first assignee
                    onChange(assignees[0].id);
                }
            } else {
                // if no assigneeId is provided, choose the first assignee
                onChange(assignees[0].id);
            }
        }
    }, [assignees, assigneeId, onChange]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };


    return (
        <label>
            Assignee
            <select 
                className="p-2 border border-black rounded" 
                value={assigneeId} 
                onChange={handleChange}
            >
                {assignees?.map((assignee) => (
                    <option key={assignee.id} value={assignee.id}>
                        {assignee.name}
                    </option>
                ))}
            </select>
        </label>
    )
}
