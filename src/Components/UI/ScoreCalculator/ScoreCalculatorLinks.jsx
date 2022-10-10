import React from 'react';

const ScoreCalculatorLinks = ({playerInfo, isPlayerInfoLoading}) => {
    return (
        <div style={{display: "inline-flex"}}>
            <a
                href={`https://worldofwarcraft.com/en-gb/character/${playerInfo?.data?.region}/howling-fjord/${playerInfo?.data?.name}`}
                title="Armory Profile" className="profile-links wowArmory"
                target="_blank"
                rel="noreferrer"
            > </a>

            <a
                href={playerInfo?.data?.profile_url}
                title="RaiderIO Profile" className="profile-links raiderIO"
                target="_blank"
                rel="noreferrer"
            > </a>
            {!isPlayerInfoLoading &&
                <img
                    src={playerInfo?.data?.thumbnail_url}
                    className='guest'
                    alt={'Character thumbnail'}
                    style={{borderRadius: '50%'}}
                />
            }
            <a
                href={`/`}
                title="WarcraftLogs Profile" className="profile-links warcraftLogs"
                rel="noreferrer"
            > </a>
            <a
                href={`/`}
                title="Character sim on RaidBots" className="profile-links raidBots"
                rel="noreferrer"
            > </a>
        </div>
    );
};

export default ScoreCalculatorLinks;
