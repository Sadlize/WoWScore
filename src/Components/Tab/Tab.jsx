import React, {useState} from 'react';
import TabNavigation from "./TabNavigation";
import TabContent from "./TabContent";
import './Tab.css';

const Tab = (props) => {
    const [activeTab, setActiveTab] = useState('0');
    const childrenKeys = Object.keys(props.children)

    return (
        <div>
            <h2 className='content-heading'><span>{props.title}</span></h2>
            <ul className="tabNav">
                {childrenKeys.map((key) => (
                    <TabNavigation
                        key={key}
                        title={props.children[key].props.title}
                        id={key}
                        activeTab={[activeTab, setActiveTab]}
                    />
                ))}
            </ul>
            <div className="outlet">
                {childrenKeys.map((key) => (
                    <TabContent key={key} id={key} activeTab={activeTab}>
                        {props.children[key]}
                    </TabContent>
                ))}
            </div>
        </div>
    );
};

export default Tab;
