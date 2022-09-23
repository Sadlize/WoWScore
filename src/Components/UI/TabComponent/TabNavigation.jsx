import React from "react";
const TabNavigation = ({id, title, activeTab, setActiveTab }) => {

    const handleClick = () => {
        setActiveTab(id);
    };

    return (
        <li onClick={handleClick} className={(activeTab === id ? "active" : "")}>
            {/*<h2 className='content-heading'><span>{ title }</span></h2>*/}
            {title}
        </li>
    );
};
export default TabNavigation;
