import { useApi } from "../hooks/useApi"
import { Link, Outlet, useMatch, useParams } from "react-router-dom"
import useProjects from "../hooks/useProjects"

export default function ProjectPicker() {
    const { teamId } = useParams()
    const {
        status,
        data: projects,
        error,
        isFetching,
    } = useProjects()

    return (
        <>
            {projects && (
                <>
                    <div className="flex flex-row gap-4 p-2 items-center justify-start">
                        {projects.map((project, index) => {
                            return (
                                <ProjectLink
                                    key={index}
                                    to={`/${teamId}/${project.id}`}
                                >
                                    {project.name}
                                </ProjectLink>
                            )
                        })}
                        <ProjectLink create to={`/${teamId}/create-project`}>
                            + New project
                        </ProjectLink>
                    </div>
                    <Outlet />
                </>
            )}
        </>
    )
}

type ProjectLinkProps = {
    to: string
    children: React.ReactNode
    create?: boolean
}

function ProjectLink({ to, children, create }: ProjectLinkProps) {
    const match = useMatch(`${to}*`)
    return (
        <Link to={to}>
            {create ? (
                <button
                    className="font-bold text-gray-800 px-4 py-2"
                    type="button"
                >
                    {children}
                </button>
            ) : (
                <button
                    className={`border border-black py-1 px-4 rounded  ${
                        match ? " bg-blue-500 text-white shadow-90s-small" : "shadow-sm bg-white"
                    }`}
                    type="button"
                >
                    {children}
                </button>
            )}
        </Link>
    )
}
