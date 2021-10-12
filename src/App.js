import React from 'react';
//import logo from './logo.svg';
import './App.css';

import text from './Keyboard/text'

//import Player from './Player';
//import Books from './Books';
//import Newline from './Newline';
//import Table from './Table';

import Keyboard from './Keyboard'

import Book from './Book';

import Timer from './Timer/Timer'

import Player from './Player/Player'

const App = () => {
  console.log('Render App')
   
  return (
    <body style={{'width': '100%'}}>
    <div className="App">
        {false && <Timer /> }
        {false && <Book />}
       <Player />
        <p>
          React Vocab
        </p>
        {true && <Keyboard text={text}/>} 
      
    </div>
    </body>
  );
}

export default App;



/*

{false && <Table />}
{false && <Player />}
{false && <Books />}
      
*/
