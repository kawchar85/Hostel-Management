import SidebarItem from "./SidebarItem"
import items from "../data/administration_sidebar/sidebar.json"

export default function AdministrationSidebar() {
    return (
        <div className="sidebar">
            {items.map((item, index) => <SidebarItem key={index} item={item} />)}
        </div>
    )
}