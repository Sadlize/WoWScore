import React, {useState} from 'react';

const ScoreCalculator = () => {

	const [scorePerDungeon, setScorePerDungeon] = useState(
		{
			STRT: {Tyrannical: 0, Fortified: 0},
			GMBT: {Tyrannical: 0, Fortified: 0},
			YARD: {Tyrannical: 0, Fortified: 0},
			WORK: {Tyrannical: 0, Fortified: 0},
			ID: {Tyrannical: 0, Fortified: 0},
			GD: {Tyrannical: 0, Fortified: 0},
			LOWR: {Tyrannical: 0, Fortified: 0},
			UPPR: {Tyrannical: 0, Fortified: 0},
		})
	const dungeonKey = Object.keys(scorePerDungeon)

	let sumDungeonScoreValues = 0
	const dungeonArray = Object.keys(scorePerDungeon)
	dungeonArray.forEach(item =>
		sumDungeonScoreValues += Object.values(scorePerDungeon[item])
			.sort((a, b) => b - a)
			.reduce((a, b) => (a * 1.5) + (b * 0.5))
	)

	const calcPointsForKeyLevel = (keyLevel) => {
		let seasonal = 0
		let affixes = 0
		let base = 0

		if (keyLevel >= 2) base = 30
		if (keyLevel >= 4) affixes = 1
		if (keyLevel >= 7) affixes = 2
		if (keyLevel >= 15) seasonal = 10

		return base + (keyLevel * 5) + (affixes * 5) + seasonal
	}

	return (
		<div>
			<h2>ScoreCalculator</h2>
			<div className='content-block'>
				<p className='calcScore'>{sumDungeonScoreValues}</p>
				<hr/>
				{/*<div className="dungeon-grid">*/}
				{/*    <span>Test</span>*/}
				{/*    <img src="https://wow.zamimg.com/images/wow/icons/large/ability_toughness.jpg"/>*/}
				{/*    <img src="https://wow.zamimg.com/images/wow/icons/large/ability_toughness.jpg"/>*/}
				{/*</div>*/}
				{dungeonKey.map((key) => (
					<div key={key} className="dungeon-grid">
						<span>{key}</span>
						<input
							placeholder='0'
							onFocus={(e) => e.target.placeholder = ''}
							onBlur={(e) => e.target.placeholder = '0'}
							type='text' id={key} maxLength="2" autoComplete="off"
							className={(scorePerDungeon[key].Tyrannical !== 0 ? 'grayscale0' : 'grayscale100') + ' inp'}
							onChange={event =>
								setScorePerDungeon(prevState => (
									{
										...prevState,
										[key]: {
											...prevState[key],
											'Tyrannical': calcPointsForKeyLevel(+event.target.value)
										}
									}
								))}
						/>
						<input
							placeholder='0'
							onFocus={(e) => e.target.placeholder = ''}
							onBlur={(e) => e.target.placeholder = '0'}
							type='text' id={key} maxLength="2" autoComplete="off"
							className={(scorePerDungeon[key].Fortified !== 0 ? 'grayscale0' : 'grayscale100') + ' inp'}
							onChange={event =>
								setScorePerDungeon(prevState => (
									{
										...prevState,
										[key]: {
											...prevState[key],
											'Fortified': calcPointsForKeyLevel(+event.target.value)
										}
									}
								))}
						/>
					</div>
				))}
				<hr/>
				<input/>
				<select>
					<option>1</option>
				</select>
				<button>123</button>
			</div>
		</div>
	);
};

export default ScoreCalculator;
