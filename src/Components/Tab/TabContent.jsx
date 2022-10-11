import React from "react";

const TabContent = ({children, id, activeTab}) => {

    return (
        activeTab === id ? <div className="TabContent">
                {children}
            </div>
            : null
    );
};

export default TabContent;
