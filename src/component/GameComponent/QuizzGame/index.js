import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getQuestions } from '../../../store/reducer/game.reducer';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';
import Loading from '../../Loading';
import './quizzGame.scss';


export default function QuizzGame() {
	const dispatch = useDispatch();
	const questions = useSelector(state => state.gameReducer.questions);
	const gameLoading = useSelector(state => state.gameReducer.gameLoading);
	const history = useHistory();

	useEffect(() => {
		if (!questions.length) {
			dispatch(getQuestions());
		}

	}, [])


	const chooseLevel = (e, level) => {
		e.preventDefault();
		history.push(`/game/quizz/${level}`);
	}

	return (
		<div className="quizz-game">
			{
				gameLoading ?
					<Loading />
					:
					<>
						<div className='intro-text'>
							<span>Hãy xem bạn hiểu <strong style={{color: 'yellow'}}> Tiếng Việt </strong> bao nhiêu !</span>
						</div>
						<div className='level-text'>

							<div className='content'>
								Chọn cấp độ phù hợp
							</div>
						</div>
						<div className='btn-level'>
							<Button sx={{ color: 'green' }} onClick={e => chooseLevel(e, 1)}>Dễ</Button>
							<Button sx={{ color: 'greenyellow' }} onClick={e => chooseLevel(e, 2)}> Dễ vừa</Button>
							<Button sx={{ color: 'yellow' }} onClick={e => chooseLevel(e, 3)}>Bình thường</Button>
							<Button sx={{ color: 'orange' }} onClick={e => chooseLevel(e, 4)} >Khó</Button>
							<Button sx={{ color: 'red' }} onClick={e => chooseLevel(e, 5)}>Siêu khó</Button>
						</div>

					</>
			}
			<div style={{
				position: 'absolute',
				bottom: 0,

			}}>
				<Button style={{
					width: '150px',
					color: '#fff'
				}}
					onClick={e => { history.push('/game') }}
				>Thoát</Button>
			</div>
		</div >


	);
}
