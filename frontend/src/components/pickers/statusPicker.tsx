import { useEffect } from "react"
import useStatuses from "../../hooks/useStatuses"

type StatusPickerProps = {
    statusId?: string
    onChange: (statusId: string) => void
}

export default function StatusPicker({ statusId, onChange }: StatusPickerProps) {
    const { status, data: statuses, error, isFetching } = useStatuses()

    useEffect(() => {
        if (statuses && statuses.length > 0) {
            if (statusId) {
                // if statusId is provided, make sure it is valid
                const isValid = statuses.some(status => status.id === statusId);
                if (isValid) {
                    onChange(statusId);
                } else {
                    // if it's not valid, choose the first status
                    onChange(statuses[0].id);
                }
            } else {
                // if no statusId is provided, choose the first status
                onChange(statuses[0].id);
            }
        }
    }, [statuses, statusId, onChange]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <label>
            Status
            <select 
                className="p-2 border border-black rounded" 
                value={statusId} 
                onChange={handleChange}
            >
                <option disabled hidden value="">Select a status</option>
                {statuses?.map((status) => (
                    <option key={status.id} value={status.id}>
                        {status.name.toUpperCase()}
                    </option>
                ))}
            </select>
        </label>
    )
}
