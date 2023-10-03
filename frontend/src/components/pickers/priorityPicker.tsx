import { useEffect } from "react"
import usePriorities from "../../hooks/usePriorities"

type PriorityPickerProps = {
    priorityId?: string
    onChange: (priorityId: string) => void
}


export default function PriorityPicker({ priorityId, onChange }: PriorityPickerProps) {
    const { status, data: priorities, error, isFetching } = usePriorities()

    useEffect(() => {
        if (priorities && priorities.length > 0) {
            if (priorityId) {
                // if priorityId is provided, make sure it is valid
                const isValid = priorities.some(priority => priority.id === priorityId);
                if (isValid) {
                    onChange(priorityId);
                } else {
                    // if it's not valid, choose the first priority
                    onChange(priorities[0].id);
                }
            } else {
                // if no priorityId is provided, choose the first priority
                onChange(priorities[0].id);
            }
        }
    }, [priorities, priorityId, onChange]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <label>
            Priority
            <select 
                className="p-2 border border-black rounded" 
                value={priorityId} 
                onChange={handleChange}
            >
                {priorities?.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                        {priority.name.toUpperCase()}
                    </option>
                ))}
            </select>
        </label>
    )
}
