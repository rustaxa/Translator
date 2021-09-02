import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import PlayerButtons from './PlayerButtons'
import Keyboard from '../Keyboard';

const Player = (props) => {
  //  vodeio id r1wIff85jF4
    const [time, setTime] = useState('00: 00')
    const [s, setS] = useState({'0': 'START'});
    const [oneSub, setOneSub] = useState('No subs')
    const [pause, setPause] = useState('')
    const [YTplayer, setYTplayer] = useState({})

    useEffect(() => {
      //getTranslate('http://localhost/gc.php', setS)
      
     // console.log('PROMISE', getTranslate('http://localhost/gc.php', setS) instanceof Promise)
      console.log('USE')
    }, [props])

    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        //event.target.pauseVideo();
        setYTplayer(event.target)
        // пробел - пауза или проигрывание
        document.body.onkeypress = function(e){
          if(event.target.getPlayerState() == 2){
            event.target.playVideo()
          }else{
            event.target.pauseVideo()
          }
        }

        console.log('Загрузка субтитров');
        fetch('http://localhost/gc.php')
        .then(response => response.json()) // преобразуем ответ в json
        .then(data => subsFormating(data))
        .then(subs => enableSubs(subs, event, setOneSub))    
    }

    const opts = {
      
        height: '480',
        width: '854',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          controls: 1,
          modestbranding: 1
        },
      };
    return (
        <div style={{width: 400}}>
          
          <YouTube videoId="aeaQpuYPsy8" opts={opts} onReady={_onReady} />
          <PlayerButtons player={YTplayer}/>
          <h3>{oneSub}</h3>
          {false && <Keyboard text={oneSub}/>}
          <p>Time is: {time} </p>
          <button onClick={()=>{getTranslate('http://localhost/gc.php', setS)}}>Загрузить субтитры</button>
        </div>
    )
}

const getTranslate = (url, setSomeThing) => {
  
  fetch(url)
  .then(response => response.json()) // преобразуем ответ в json
  .then(data => {
    subsFormating(data)
    /*
      let subs = {}
      let prevTime = ''
      let seconds = ''
      
      for(let currentTime in data){
        seconds = (currentTime/1000).toFixed()
        if(prevTime === seconds){
          subs[prevTime] = data[currentTime] + ' - ' + subs[prevTime]
        }
        prevTime = seconds;
        subs[seconds] = data[currentTime]
         
      }
      
      console.log('SUUUBS', subs)
      setSomeThing((prev) => subs)
      return subs;
      */
  })//.then( subs => setSomeThing((prev) => subs))
  //.catch(err => console.log(err + 'Ошибка'))
  
}


const enableSubs = (subs, event, setSub) => { // включить субтитры
  setInterval(() => {
          
    //time = (1000 * event.target.getCurrentTime()).toFixed();
    let time = (1 * event.target.getCurrentTime()).toFixed() 
    //setTime( time)
    if( subs[time] ){
      setSub( subs[time] )
      console.log('ss', subs[time])
    }
  }, 500)
}

const subsFormating = (data) => { // субтитры в удобный формат
  let subs = {}
  let prevTime = ''
  let seconds = ''
  
  for(let currentTime in data){
    seconds = (currentTime/1000).toFixed()
    if(prevTime === seconds){
      subs[prevTime] = data[currentTime] + ' - ' + subs[prevTime]
    }
    prevTime = seconds;
    subs[seconds] = data[currentTime]
     
  }
  
  console.log('SUUUBS', subs)
  //setSomeThing((prev) => subs)
  return subs;
}

/*
милисекунды в обычное время
function convertMS( milliseconds ) {
    milliseconds = milliseconds < 1000 ? 1000 : milliseconds
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    // return (`${day} ${hour} ${minute} ${seconds}`);
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}

*/

export default Player;