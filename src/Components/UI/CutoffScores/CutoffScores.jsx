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
            {isCutoffLoading
                ? <h1>Loading cutoffs...</h1>
                : <>
                    <h2>Cutoffs:</h2>
                    <p>US: {cutoffScore.US} </p>
                    <p>EU: {cutoffScore.EU}</p>
                    <p>TW: {cutoffScore.TW}</p>
                    <p>KR: {cutoffScore.KR}</p>
                </>
            }
        </div>
    );
};

export default CutoffScores;