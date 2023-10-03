import useStatuses from "../hooks/useStatuses";

type StatusIndicatorProps = {
    statusId: string
}

export default function StatusIndicator({ statusId }: StatusIndicatorProps) {
    const { status, data: statuses, error, isFetching } = useStatuses()
    
    const currentStatus = statuses?.find((status) => status.id === statusId)
    return (
            <div className="px-2 py-1 text-white font-bold text-xs bg-gray-500 rounded">
                {currentStatus?.name.toUpperCase()}
            </div>
    )
}