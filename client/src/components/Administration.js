import React, { useState, useContext } from 'react'
import Axios from 'axios';
import AdministrationSidebar from './AdministrationSidebar';

import '../index.css';
import { useSearchParams } from 'react-router-dom';
import AddHostel from './AddHostel';
import GetHostelData from './GetHostelData';
import SwapManual from './SwapManual';
import AddNotice from './AddNotice';
import NoticeList from './NoticeList';
import Error from './Error';

import { PublicContex } from './PublicContext';
import RemoveHostel from './RemoveHostel';
import AddRoom from './AddRoom';
import RemoveRoom from './RemoveRoom';

export default function Administration() {

    const [publicData, setPublicData] = useContext(PublicContex);
    // console.log(publicData);
    // setPublicData({...publicData,refrash: true});
    // console.log(publicData);

    const [query, setQuery] = useSearchParams();

    let action = "add";
    let section = "hostel";
    if (query.get("action") !== "")
        action = query.get("action")
    if (query.get("section") !== "")
        section = query.get("section")

    let com = <AddHostel />;
    if (section === null)
        com = <AddHostel />;
    else if (section === "hostel") {
        if (action === "add")
            com = <AddHostel />;
        else if (action === "remove")
            com = <RemoveHostel />;
        else if (action === "update")
            com = <GetHostelData />;
        else
            com = <Error />;
    }
    else if (section === "room") {
        if (action === "add")
            com = <AddRoom />;
        else if (action === "remove")
            com = <RemoveRoom />
        else if (action === "swap")
            com = <SwapManual />;
        else
            com = <Error />;
    }
    else {
        com = <Error />;
    }

    //will send current users' role id in sidebar
    return (
        <div id="side">
            <div className="main">
                <AdministrationSidebar />
                <div className="container">
                    <div style={{
                        textShadow: "#f9fafb 0px 1px 0px, #0d6efd 3px 3px 3px",
                        textAlign: "center",
                        textTransform: "uppercase",
                        color: "#666",
                        margin: "0 0 30px 0",
                        letterSpacing: "4px",
                        font: "normal 30px/2 Segoe Print,Verdana, Helvetica",
                        position: "relative",
                    }} >

                        {query.get("action")}  {query.get("section")}
                    </div>


                    {com}


                </div>
            </div>
        </div>
    );
}
