import { useState, useContext } from "react"
import { storeData, getData, eraseData} from '../App';

export default function SidebarItem({ item }) {
    const [open, setOpen] = useState(false)
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
  
        if (getData("user_role_id") === "20" || parseInt(getData("user_role_id")) === item.priority ||item.priority === 10)
            return (
                <a href={item.path || "#"} className="sidebar-item plain">
                    {item.title}
                </a>
            )
        else return (<></>)
    }
}
