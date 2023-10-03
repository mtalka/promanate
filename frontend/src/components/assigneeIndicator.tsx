import useUsers from "../hooks/useUsers";

type AssigneeIndicatorProps = {
    assigneeId: string
}

export default function AssigneeIndicator({ assigneeId }: AssigneeIndicatorProps) {
    const { status, data: assignees, error, isFetching } = useUsers()
    
    const currentAssignee = assignees?.find((assignee) => assignee.id === assigneeId)
    return (
            <div className="px-2 py-1 text-white font-bold text-xs bg-gray-500 rounded">
                {currentAssignee?.name.toUpperCase()}
            </div>
    )
}