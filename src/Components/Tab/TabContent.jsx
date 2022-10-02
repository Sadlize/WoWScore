import React from "react";

const TabContent = ({children, ...props}) => {
    const id = props?.id
    const activeTab = props?.activeTab

    return (
        activeTab === id ? <div className="TabContent">
                {children}
            </div>
            : null
    );
};

export default TabContent;
