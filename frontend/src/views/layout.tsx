import { Outlet } from "react-router-dom"
import ProjectPicker from "./projectPicker"

export default function Layout() {
    return (
        <div className="bg-gray-500">
            <Outlet />
        </div>
    )
}
