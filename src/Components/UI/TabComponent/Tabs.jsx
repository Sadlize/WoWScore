import React, {useState} from 'react';
import CurrentAffixes from "../Affixes/CurrentAffixes";
import AffixesSchedule from "../Affixes/AffixesSchedule";
import TabNavigation from "./TabNavigation";
import TabContent from "./TabContent";

const Tabs = (test) => {
    const [activeTab, setActiveTab] = useState(0);
    console.log(test)
    return (
        <div>
            <h2 className='content-heading'><span>Affixes</span></h2>
            <ul className="tabNav">
                <TabNavigation title="Current" id={0} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavigation title="Schedule" id={1} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </ul>

            <div className="outlet">
                <TabContent id={0} activeTab={activeTab}>
                    <CurrentAffixes/>
                </TabContent>
                <TabContent id={1} activeTab={activeTab}>
                    <AffixesSchedule/>
                </TabContent>

            </div>
        </div>
    );
};

export default Tabs;
