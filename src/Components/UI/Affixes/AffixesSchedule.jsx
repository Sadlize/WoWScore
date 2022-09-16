import React from 'react';
import {useCallback, useEffect, useState} from "react";
import {useFetching} from "../../../hooks/useFetching";
import BattleNet from "../../../API/BattleNet";

const AffixesSchedule = () => {

    /**
     *  List of all affixes
     *  in the game
     */
    const [affixesList, setAffixesList] = useState([])
    const [fetchAffixesList, isAffixesListLoading] = useFetching(useCallback(async () => {
        const response = await BattleNet.test()
        setAffixesList(response)
    }, []))

    /**
     *  CurrentAffixes Schedule for 12 weeks
     */
    const affixesSchedule = {
        season: 'Shrouded',
        1:  ['Tyrannical',  'Inspiring',    'Quaking'],
        2:  ['Fortified',   'Sanguine',     'Grievous'],
        3:  ['Tyrannical',  'Bolstering',   'Explosive'],
        4:  ['Fortified',   'Bursting',     'Storming'],
        5:  ['Tyrannical',  'Raging',       'Volcanic'],
        6:  ['Fortified',   'Inspiring',    'Grievous'],
        7:  ['Tyrannical',  'Spiteful',     'Necrotic'],
        8:  ['Fortified',   'Bolstering',   'Quaking'],
        9:  ['Tyrannical',  'Sanguine',     'Storming'],
        10: ['Fortified',   'Raging',       'Explosive'],
        11: ['Tyrannical',  'Bursting',     'Volcanic'],
        12: ['Fortified',   'Spiteful',     'Necrotic'],
    }

    const weeks = Object.keys(affixesSchedule).filter(item => item !== 'season')
    weeks.map(key => affixesSchedule[key])


    useEffect(() => {
        fetchAffixesList()
    }, [fetchAffixesList])

    return (
        <div>
            <h2>Affixes schedule:</h2>
            <div className='content-block'>
                {isAffixesListLoading
                    ? <h1>Loading affixes schedule...</h1>
                    : <>
                        {weeks.map((key) => (
                            <div key={key}>
                                {/*{key}*/}
                                {affixesSchedule[key].map((affix) => (
                                    <img
                                        key={affixesList[affix]?.name + '_' + key}
                                        src={affixesList[affix]?.icon}
                                        alt={affixesList[affix]?.name}
                                        title={affixesList[affix]?.description}
                                    />
                                ))}
                                <img
                                    key={affixesList[affixesSchedule?.season]?.icon + '_' + key}
                                    src={affixesList[affixesSchedule?.season]?.icon}
                                    alt={affixesList[affixesSchedule?.season]?.name}
                                    title={affixesList[affixesSchedule?.season]?.description}
                                />
                            </div>
                        ))}
                    </>
                }
            </div>
        </div>
    );
};

export default AffixesSchedule;