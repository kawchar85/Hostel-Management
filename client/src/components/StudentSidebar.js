import SidebarItem from "./SidebarItem"
import items from "../data/student_sidebar/sidebar.json"

export default function StudentSidebar() {
    return (
        <div className="sidebar">
            {items.map((item,index)=><SidebarItem key={index} item={item} />)}
        </div>
    )
}