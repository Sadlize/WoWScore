import React, {useCallback} from 'react';
import {useEffect, useState} from "react";
import {useFetching} from "../../../hooks/useFetching";
import RaiderIO from "../../../API/RaiderIO";

const CurrentAffixes = () => {

    /**
     *  Current Week CurrentAffixes
     */
    const [currentAffixes, setCurrentAffixes] = useState([])
    const [fetchCurrentAffixes, isCurrentAffixesLoading] = useFetching(useCallback(async () => {
        const response = await RaiderIO.getCurrentAffixes()
        setCurrentAffixes(response)
    }, []))

    /**
     *  Current Week Dates
     */
    const [currentWeekPeriod, setCurrentWeekPeriod] = useState('')
    const [fetchCurrentWeekPeriod] = useFetching(useCallback(async () => {
        const response = await RaiderIO.getCurrentWeekPeriod()
        setCurrentWeekPeriod(response)
    }, []))

    useEffect(() => {
        fetchCurrentAffixes()
        fetchCurrentWeekPeriod()
    }, [fetchCurrentAffixes, fetchCurrentWeekPeriod])

    return (
        <div>
            <h2>Current affixes:</h2>
            <div className='content-block'>
                {isCurrentAffixesLoading
                    ? <h1>Loading current affixes...</h1>
                    : <>
                        <p>{currentWeekPeriod}</p>
                        {currentAffixes.map((currentAffixes) => (
                            <img
                                key={currentAffixes?.id}
                                src={"https://wow.zamimg.com/images/wow/icons/large/" + currentAffixes?.icon + ".jpg"}
                                alt={currentAffixes?.name}
                                title={currentAffixes?.description}
                            />
                        ))}
                        <p>{currentAffixes[0]?.name + ', ' + currentAffixes[1]?.name + ', ' + currentAffixes[2]?.name + ', ' + currentAffixes[3]?.name}</p>
                    </>
                }
            </div>
        </div>
    );
};

export default CurrentAffixes;