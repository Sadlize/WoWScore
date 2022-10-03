import React, {useState} from 'react';
import clsx from "clsx";
import {calcPointsForKeyLevel} from "../../../utils/ScoreCalculator/calcPointsForKeyLevel";
import ScoreCalculatorModal from "./ScoreCalculatorModal";
import {AiFillStar} from "react-icons/ai";
import IconRadioInput from "../../Input/IconRadioInput/IconRadioInput";
import IconRadioWrapper from "../../Input/IconRadioInput/IconRadioWrapper";

const ScoreCalculatorInput = ({week, index, placeholder, scorePerDungeon, setScorePerDungeon}) => {
    const [input, setInput] = useState('')

    const isDifferent = (value) => {
        value = value.replace(/\D/g, '')
        if (input === value) {
            return 0 //same
        } else {
            return 1 //different
        }
    }

	const inputNewValue = (event) => {
		const value = event.target.value
		if (value.length <= event.target.maxLength) {
			if (isDifferent(value)) {
				setInput(value)
				setScorePerDungeon(prevState => (
					{
						...prevState,
						[index]: {...prevState[index], [week]: calcPointsForKeyLevel(+value)}
					}
				))
			}
		}
	}

    const [modal, setModal] = useState(false)

    const [radioOption, setRadioOption] = useState(0)
    const [dungeonTimestamp, setDungeonTimestamp] = useState(0)

    return (
        <>
            <ScoreCalculatorModal visible={modal} setVisible={setModal}>
                <div className="dungeon-grid">
                    <h2 className={'content-heading'}>{index + ' ' + week}</h2>
                    <input
						value={input}
						placeholder={placeholder}
						onFocus={(e) => e.target.placeholder = ''}
						onBlur={(e) => e.target.placeholder = placeholder}
						type='text' autoComplete="off" maxLength='2'
						className={clsx({'grayscale100': scorePerDungeon[index][week] === 0}, 'CalcInput')}
						onChange={e => {
							inputNewValue(e)
                        }}
                    />
                    <div>
                        <div className='StarTimestamp'>
                            <IconRadioWrapper
                                color={"#ffbb4d"} count={3}
                                states={{radioOption, setRadioOption, setDungeonTimestamp}}
                            >
                                <IconRadioInput
                                    name={index + week}
                                    icon={<AiFillStar/>}
                                    id={index + week[0] + 'star'}
                                />
                            </IconRadioWrapper>
                        </div>
                        <input
                            type="range" min="0" max="100" step="50" value={dungeonTimestamp}
                            onChange={(e) => {
                                if (+e.target.value === 0) setRadioOption(0)
                                if (+e.target.value === 50) setRadioOption(1)
                                if (+e.target.value === 100) setRadioOption(2)
                                setDungeonTimestamp(+e.target.value)
                            }}
                        />
                    </div>
                </div>
            </ScoreCalculatorModal>
            <input
                value={input}
                placeholder={placeholder}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = placeholder}
                type='text' autoComplete="off" maxLength='2'
                className={clsx({'grayscale100': scorePerDungeon[index][week] === 0}, 'CalcInput')}
                onChange={e => {
					inputNewValue(e)
                }}
                onContextMenu={(e) => {
                    e.preventDefault()
                    setModal(true)
                }}
            />
        </>
    );
};

export default ScoreCalculatorInput;
