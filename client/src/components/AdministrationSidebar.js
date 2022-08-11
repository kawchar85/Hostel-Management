import React, { useContext } from 'react'
import SidebarItem from "./SidebarItem"
import items from "../data/administration_sidebar/sidebar.json"
import items2 from "../data/administration_sidebar/sidebar_2.json"
import { PublicContex } from './PublicContext';

export default function AdministrationSidebar() {
    const [publicData, setPublicData] = useContext(PublicContex);
    if(publicData.user.rule_id === 20)
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