import React, { useContext } from 'react'
import SidebarItem from "./SidebarItem"
import items from "../data/administration_sidebar/sidebar.json"
import items2 from "../data/administration_sidebar/sidebar_2.json"
import { storeData, getData, eraseData} from '../App';

export default function AdministrationSidebar() {
    if(getData("user_role_id") === 20)
        return (
            <div className="sidebar">
                {items.map((item, index) => <SidebarItem key={index} item={item} />)}
            </div>
        )
    else
        return (
            <div className="sidebar">
                {items2.map((item, index) => <SidebarItem key={index} item={item} />)}
            </div>
        )
}