import React from "react";
const TabNavigation = (props) => {
    const id = props?.id
    const title = props?.title
    const [activeTab, setActiveTab] = props?.activeTab

    const handleClick = () => {
        setActiveTab(id);
    };

    return (
        <li onClick={handleClick} className={(activeTab === id ? "active" : "")}>
            {title}
        </li>
    );
};
export default TabNavigation;
