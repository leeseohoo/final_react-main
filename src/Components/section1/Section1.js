// 좌측 Nav : SUBJECT

import React from "react";
import main from "C:/Users/user/Downloads/hpe-modify/hpe-example-main/my-app/src/Images/main.png";
import Nav from 'C:/Users/user/Downloads/hpe-modify/hpe-example-main/my-app/src/Components/nav/Nav';
import { FaHome } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Section1 = () => {
    return (
        <div className="section1">
            <Nav/>
            <div className="section">
            <a name="target1"></a>            
            <h3 className="back">
                <Link to={"/Home2"}>
                    <FaHome />HOME
                </Link>
            </h3>
            <div className="name">
                OCEAN LAB
            </div>
            <div className="main-introduction">
                <div className="title"><h3>불법외국어선 단속강화</h3></div>
                <h5>해경특수기동대원 원격 생체신호 모니터링 시스템</h5>
            </div>
            <img className="main" src={main} width="555px"/>
            
            </div>
        </div>
    )
}

export default Section1