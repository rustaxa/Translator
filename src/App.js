import React from 'react';
//import logo from './logo.svg';
import './App.css';

//import Player from './Player';
//import Books from './Books';
//import Newline from './Newline';
//import Table from './Table';

import Keyboard from './Keyboard'

import Book from './Book';

import Timer from './Timer/Timer'

const App = () => {
  console.log('Render App')
   
  return (
    <div className="App">
        {false && <Timer /> }
        {false && <Book />}
       
        <p>
          React Vocab
        </p>
        <Keyboard />
      
    </div>
  );
}

export default App;



/*

{false && <Table />}
{false && <Player />}
{false && <Books />}
      
*/
