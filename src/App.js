import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './routes/HomePage';
import FavoritePage from './routes/FavoritePage';
import './App.scss'
import Post from './routes/Post'
import GamePage from './routes/GamePage';
import HangmanGame from './component/GameComponent/HangmanGame'
import Layout from './component/Layout';
import CategoryPost from './routes/CategoryPost';
import HashTagPost from './routes/HashTagPost';
import QuizzGame from './component/GameComponent/QuizzGame';
import QuizzLevel from './component/GameComponent/QuizzGame/QuizzLevel';
import MemoryGame from './component/GameComponent/MemoryGame';


export default function App() {


  return (
    <div className="App">
      <Switch>
        <Layout exact path="/">
          <HomePage />
        </Layout>
        <Layout exact path="/post">
          <FavoritePage />
        </Layout>
        <Layout exact path="/game">
          <GamePage />
        </Layout>
        <Layout exact path="/post/:postId">
          <Post />
        </Layout>
        <Layout path="/category/:cateId">
          <CategoryPost />
        </Layout>
        <Layout path="/hashtag/:hashTagId">
          <HashTagPost />
        </Layout>
        <Route path="/game/hangman">
          <HangmanGame />
        </Route>
        <Route path="/game/memory">
          <MemoryGame />
        </Route>
        <Route exact path="/game/quizz">
          <QuizzGame />
        </Route>
        <Route path="/game/quizz/:level">
          <QuizzLevel />
        </Route>
      </Switch>
    </div>
  )
}
