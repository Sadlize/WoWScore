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
            <div className='content-block'>
                {isCurrentAffixesLoading
                    ? <span>Loading current affixes...</span>
                    : <>
                        <p>{currentWeekPeriod}</p>
                        {currentAffixes.map((currentAffixes) => (
                            <a
                                key={currentAffixes?.id}
                                href={'https://wowhead.com/affix=' + currentAffixes?.id}
                                target="_blank"
                                rel='noreferrer'
                            >
                                <img
                                    src={"https://wow.zamimg.com/images/wow/icons/large/" + currentAffixes?.icon + ".jpg"}
                                    alt={currentAffixes?.name}
                                />
                            </a>
                        ))}
                        <p>{currentAffixes.map(item => item?.name).join(', ')}</p>
                    </>
                }
            </div>
        </div>
    );
};

export default CurrentAffixes;
