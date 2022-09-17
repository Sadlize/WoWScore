import React from 'react';

const ScoreCalculator = () => {

    const calcPointsForKeyLevel = (keyLevel) => {
        let seasonal = 0
        let affixes = 0

        if(keyLevel >= 4) affixes = 1
        if(keyLevel >= 7) affixes = 2
        if(keyLevel >= 15) seasonal = 10

        let result = 30 + (keyLevel * 5) + (affixes * 5) + seasonal
        console.log(`${keyLevel}`,result)
        return result
    }

    return (
        <div>
            <h2>ScoreCalculator</h2>
            <div className='content-block'>
                {calcPointsForKeyLevel(31)}
            </div>
        </div>
    );
};

export default ScoreCalculator;