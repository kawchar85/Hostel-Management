import { useState, useContext } from "react"
import { PublicContex } from './PublicContext';

export default function SidebarItem({ item }) {
    const [open, setOpen] = useState(false)
    const [publicData, setPublicData] = useContext(PublicContex);

    if (item.childrens) {
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        {item.title}
                    </span>
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                </div>
                <div className="sidebar-content">
                    {item.childrens.map((child, index) => <SidebarItem key={index} item={child} />)}
                </div>
            </div>
        )
    } else {
        if (publicData.user.rule_id === 20 || publicData.user.rule_id === item.priority)
            return (
                <a href={item.path || "#"} className="sidebar-item plain">
                    {item.title}
                </a>
            )
        else return (<></>)
    }
}