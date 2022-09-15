import React, {useCallback} from 'react';
import {useEffect, useState} from "react";
import {useFetching} from "../../../hooks/useFetching";
import RaiderIO from "../../../API/RaiderIO";
import BattleNet from "../../../API/BattleNet";

const Affixes = () => {

    /**
     *  Current Week Affixes
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

    /**
     *  List of all affixes
     *  in the game
     */
    const [affixesList, setAffixesList] = useState([])
    const [fetchAffixesList, isAffixesListLoading] = useFetching(useCallback(async () => {
        const response = await BattleNet.test()
        setAffixesList(response)
    }, []))

    useEffect(() => {
        fetchCurrentAffixes()
        fetchCurrentWeekPeriod()
        fetchAffixesList()
    }, [fetchCurrentAffixes, fetchCurrentWeekPeriod, fetchAffixesList])

    /**
     *  Affixes Schedule for 12 weeks
     */
    const affixesSchedule = {
        season: affixesList.Shrouded,
        1: [affixesList.Tyrannical, affixesList.Inspiring, affixesList.Quaking],
        2: [affixesList.Fortified, affixesList.Sanguine, affixesList.Grievous],
        3: [affixesList.Tyrannical, affixesList.Bolstering, affixesList.Explosive],
        4: [affixesList.Fortified, affixesList.Bursting, affixesList.Storming],
        5: [affixesList.Tyrannical, affixesList.Raging, affixesList.Volcanic],
        6: [affixesList.Fortified, affixesList.Inspiring, affixesList.Grievous],
        7: [affixesList.Tyrannical, affixesList.Spiteful, affixesList.Necrotic],
        8: [affixesList.Fortified, affixesList.Bolstering, affixesList.Quaking],
        9: [affixesList.Tyrannical, affixesList.Sanguine, affixesList.Storming],
        10: [affixesList.Fortified, affixesList.Raging, affixesList.Explosive],
        11: [affixesList.Tyrannical, affixesList.Bursting, affixesList.Volcanic],
        12: [affixesList.Fortified, affixesList.Spiteful, affixesList.Necrotic],
    }

    const weeks = Object.keys(affixesSchedule).filter(item => item !== 'season')
    weeks.map(key => affixesSchedule[key])


    return (
        <div>
            {isCurrentAffixesLoading
                ? <h1>Loading affixes...</h1>
                : <>
                    <h1>Affixes</h1>
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
            {isAffixesListLoading
                ? <h1>Loading affixes...</h1>
                : <>
                    {weeks.map((key) => (
                        <div key={key}>
                            {key}
                            {affixesSchedule[key].map((affix) => (
                                    <img
                                        key={affix?.name + '_' + key}
                                        src={affix?.icon}
                                        alt={affix?.name}
                                        title={affix?.description}
                                    />
                                ))}
                            <img
                                key={affixesSchedule?.season?.icon + '_' + key}
                                src={affixesSchedule?.season?.icon}
                                alt={affixesSchedule?.season?.name}
                                title={affixesSchedule?.season?.description}
                            />
                        </div>
                    ))}
                </>
            }


        </div>
    );
};

export default Affixes;