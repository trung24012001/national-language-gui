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
        <Layout path="/post/:postId">
          <Post />
        </Layout>
        <Layout path="/category/:cateId">
          <CategoryPost />
        </Layout>
        <Route path="/game/hangman">
          <HangmanGame />
        </Route>
      </Switch>
    </div>
  )
}
