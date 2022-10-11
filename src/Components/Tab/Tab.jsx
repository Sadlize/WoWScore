import React, { useState } from "react"
import TabNavigation from "./TabNavigation"
import TabContent from "./TabContent"
import "./Tab.css"

const Tab = ({ children, title }) => {
  const [activeTab, setActiveTab] = useState("0")
  const childrenKeys = Object.keys(children)

  return (
    <div>
      <h2 className="content-heading">
        <span>{title}</span>
      </h2>
      <ul className="tabNav">
        {childrenKeys.map((key) => (
          <TabNavigation
            key={key}
            title={children[key].props.title}
            id={key}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </ul>
      {childrenKeys.map((key) => (
        <TabContent key={key} id={key} activeTab={activeTab}>
          {children[key]}
        </TabContent>
      ))}
    </div>
  )
}

export default Tab
