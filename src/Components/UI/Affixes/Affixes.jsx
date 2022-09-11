import React, {useCallback} from 'react';
import {useEffect, useState} from "react";
import {useFetching} from "../../../hooks/useFetching";
import RaiderIO from "../../../API/RaiderIO";

const Affixes = () => {

    const [currentAffixes, setCurrentAffixes] = useState([])
    const [fetchCurrentAffixes, isCurrentAffixesLoading] = useFetching(useCallback(async () => {
        const response = await RaiderIO.getCurrentAffixes()
        setCurrentAffixes(response)
    }, []))

    useEffect(() => {
        fetchCurrentAffixes()
    }, [fetchCurrentAffixes])

    return (
        <div>
            {isCurrentAffixesLoading
                ? <h1>Loading affixes...</h1>
                : <>
                    <h1>Affixes</h1>
                    <p>7-14th September</p>
                    <img src={"https://wow.zamimg.com/images/wow/icons/large/" + currentAffixes[0]?.icon +".jpg"} alt={'Affix Tooltip'}/>
                    <img src={"https://wow.zamimg.com/images/wow/icons/large/" + currentAffixes[1]?.icon +".jpg"} alt={'Affix Tooltip'}/>
                    <img src={"https://wow.zamimg.com/images/wow/icons/large/" + currentAffixes[2]?.icon +".jpg"} alt={'Affix Tooltip'}/>
                    <img src={"https://wow.zamimg.com/images/wow/icons/large/" + currentAffixes[3]?.icon +".jpg"} alt={'Affix Tooltip'}/>
                    <p>{currentAffixes.title}</p>
                </>
            }
        </div>
    );
};

export default Affixes;