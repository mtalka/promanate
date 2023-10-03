import usePriorities from "../hooks/usePriorities";

type PriorityIndicatorProps = {
    priorityId: string
}

export default function PriorityIndicator({ priorityId }: PriorityIndicatorProps) {
    const { status, data: priorities, error, isFetching } = usePriorities()
    
    const currentPriority = priorities?.find((priority) => priority.id === priorityId)
    return (
        <div className="px-2 py-1 text-white font-bold text-xs rounded" style={{background: "#" + currentPriority?.colorHex}}>
            {currentPriority?.name.toUpperCase()}
        </div>
    )
}