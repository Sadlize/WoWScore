import React, {useCallback, useEffect, useState} from 'react';
import {useFetching} from "../../../hooks/useFetching";
import RaiderIO from "../../../API/RaiderIO";

const CutoffScores = ({region}) => {

    const [cutoffScore, setCutoffScore] = useState({})
    const [fetchCutoffScore, isCutoffLoading] = useFetching(useCallback(async (region) => {
        const response = await RaiderIO.getCutoff(region)
        setCutoffScore(response)
    }, []))

    useEffect(() => {
        fetchCutoffScore(region)
    }, [fetchCutoffScore, region])

    return (
        <div>
            <h2 className='content-heading'><span>Cutoff<br/>scores:</span></h2>
            <div className='content-block'>
                {isCutoffLoading
                    ? <h1>Loading cutoffs...</h1>
                    : <>
                        <p>US: {cutoffScore.US} </p>
                        <p>EU: {cutoffScore.EU}</p>
                        <p>TW: {cutoffScore.TW}</p>
                        <p>KR: {cutoffScore.KR}</p>
                    </>
                }
            </div>
        </div>
    );
};

export default CutoffScores;
