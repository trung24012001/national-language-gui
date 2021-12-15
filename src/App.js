import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './routes/HomePage';
import FavoritePage from './routes/FavoritePage';
import './App.scss'
import Post from './routes/Post'
import GamePage from './routes/GamePage';
import CategoryPost from './routes/CategoryPost';
import HashTagPost from './routes/HashTagPost';
import HangmanGame from './components/GameComponent/HangmanGame'
import Layout from './components/Layout';
import QuizzGame from './components/GameComponent/QuizzGame';
import QuizzLevel from './components/GameComponent/QuizzGame/QuizzLevel';
import MemoryGame from './components/GameComponent/MemoryGame';
import Table3dComponent from './components/GameComponent/Table3dComponent';

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
        <Route path="/game/3d">
          <Table3dComponent />
        </Route>
      </Switch>
    </div>
  )
}
