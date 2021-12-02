import React from 'react';
import GameCard from '../../component/GameCard';
import './gamePage.scss'


export default function GamePage() {
    return (
        <div className="game-page">
            <GameCard name='Hang Man' path='hangman' />
            <GameCard name='Memory Game' path='memory' />
        </div>
    )
}
