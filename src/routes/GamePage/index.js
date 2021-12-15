import React from 'react';
import GameCard from '../../components/GameCard';
import './gamePage.scss'


export default function GamePage() {
    return (
        <div className="game-page">
            <GameCard name='Hang Man' path='hangman' />
            <GameCard name='Memory Game' path='memory' />
            <GameCard name='Quizz' path='quizz' />
            <GameCard name='3D View' path='3d' />
        </div>
    )
}
