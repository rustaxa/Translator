import React, { useState, useEffect, useRef  } from 'react';
import YouTube from 'react-youtube';
import PlayerButtons from './PlayerButtons'
import Keyboard from '../Keyboard';
import { style } from '@mui/system';

// узнать позицию элемента по Y относительно родителя и прокрутиться до него

const Player = (props) => {
  //  vodeio id r1wIff85jF4
    const [time, setTime] = useState('00: 00')
    const [s, setS] = useState({'0': 'START'});
    const [oneSub, setOneSub] = useState('No subs')
    const [pause, setPause] = useState('')
    const [YTplayer, setYTplayer] = useState({})
    const [videoID, setVideoID] = useState('btcuxx2mjfA')
    // субтитры для бегущей строки
    const [allSubs, setAllSubs] = useState(['First sub', 'First sub', 'First sub'])
    
    const subsScroll = useRef(null)

    useEffect(() => {
      //getTranslate('http://localhost/gc.php', setS)
      
     // console.log('PROMISE', getTranslate('http://localhost/gc.php', setS) instanceof Promise)
      console.log('USE')
    }, [props])

    const _onReady = (event) => {
        window.eventPlayer = event
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
        //subsScroll.current.querySelector('#66').scrollIntoView({block: "center", behavior: "smooth"})} }
        
        
          
       // s.scrollIntoView({block: "center", behavior: "smooth"})
        console.log('Загрузка субтитров');
        //fetch('http://localhost/gc.php')
        fetch('http://192.168.1.66/gc.php')
        .then(response => response.json()) // преобразуем ответ в json
        .then(data => subsFormating(data))
        // бегущие субтитры
        .then(subs => { 
          //setAllSubs(subs);
          let subInReadableArray = []
          for(let prop in subs){
            subInReadableArray[prop] = subs[prop]

          }
          setAllSubs(subInReadableArray);
          return subs; 
        
        })  
        
        .then(subs => enableSubs(subs, event, setOneSub))
        .then(subs => {
         // document.addEventListener("DOMContentLoaded", () => { 
            //let eventPlayer = event;
              let main = document.getElementById('frameForScrollingsSubs')
              let allP = main.querySelectorAll("p");
             // main.scrollTo(0, 5000)
             let prevSub = {style : {color: ''}}; // предыдущий субтитр
              setInterval(() => {
                //if(prevSub.style.color) 
                main = document.getElementById('frameForScrollingsSubs')
                console.log('!!!^^^^^')
                if(!allP[10]){
                   
                   allP = main.querySelectorAll("p");
                }

                 //main = document.getElementById('main')
                 //allP = main.querySelectorAll("p");
               // if( document.readyState ){
                 
                  let time = (1 * event.target.getCurrentTime()).toFixed() 
                  console.log('time:', time, 'len: ', allP.length, allP[60].offsetTop)
                  //let el = document.getElementById(time);
                  //el.scrollIntoView({block: "center", behavior: "smooth"});
                  //main.scrollTo(0, 5000)
                  if(!document.getElementById(time))return
                  
                  //if(time > allP.length) return
                  //main.scrollTo(0, allP[time].offsetTop)
                  let focusFrame = main.offsetTop + main.style.height.replace("px", "") / 2

                  
                  main.scrollTo(0, document.getElementById(time).offsetTop - focusFrame) // document.getElementById('frameForScrollingsSubs').offsetTop + frameForScrollingsSubs.height / 2
                  
                  prevSub.style.color = ''
                  document.getElementById(time).style.color = 'grey'
                  
                  //document.getElementById('frameForScrollingsSubs').querySelector('#s'+66).scrollIntoView({block: "center", behavior: "smooth"})
                  //document.querySelector('#s'+66).scrollIntoView({block: "center", behavior: "smooth"})
                  
                  //document.getElementById(time).scrollIntoView({block: "center", behavior: "smooth"})
                  prevSub = document.getElementById(time)
               // }
              }, 1000)
            
         // }  )
        })
        
        //subsScroll.querySelector('#66').scrollIntoView({block: "center", behavior: "smooth"})
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
        <div style={{width: 600}}>
          
          <YouTube videoId={videoID} opts={opts} onReady={_onReady} />
          <PlayerButtons player={YTplayer}/>
          <h3>{oneSub}</h3>
          {false && <Keyboard text={oneSub}/>}

          <div id='frameForScrollingsSubs' style={{'height': '200px', 'overflow': 'auto'}} onLoadend={()=>{alert('asdasd')}}>
            <div ref={subsScroll} id='main'>  
              { // не оригинальный индекс, вернуть индекс, или через цикл по объекту отрисовать сабы 
               allSubs.map( ( v, idx ) => {
                        return (
                                <p id={idx}>
                                  time: {idx} --> {v} 
                                </p>)
                      } )
                      
                      
              }
            </div>
            <p>субтитры бегущие</p>
            <p>субтитры бегущие</p>
            <p>субтитры бегущие</p>
            <p>субтитры бегущие</p>
            <p>субтитры бегущие</p>
          </div>
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
  /*
  запускать по две строчки субтитров
  получить все секунды показа субтитров timeOfSubs =  Object.keys(subs)
  получить текущий субтитр time
  timeOfSubs.indexOf(time) + 1
  */
  let timeOfSubs = Object.keys(subs)

  setInterval(() => {
          
    //time = (1000 * event.target.getCurrentTime()).toFixed();
    let time = (1 * event.target.getCurrentTime()).toFixed() 
    //setTime( time)
    if( subs[time] ){
      setSub( subs[time] +'\n'+ subs[timeOfSubs[timeOfSubs.indexOf(time) + 1]])
      console.log('ss', subs[time])
    }
  }, 500)
}

const subsFormating = (data) => { // субтитры в удобный формат
  // rawSubs formatedSubs
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

/* скролить до нужного элемента
import React, { useRef } from 'react'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   
// General scroll to element function

const ScrollDemo = () => {

   const myRef = useRef(null)
   const executeScroll = () => scrollToRef(myRef)

   return (
      <> 
         <div ref={myRef}>I wanna be seen</div> 
         <button onClick={executeScroll}> Click to scroll </button> 
      </>
   )
}

*/

/**
x = document.getElementById('main')
x.scrollTo(0, 50)
count = 0

xx = x.querySelectorAll("p");

console.log(xx.length)

console.log(typeof xx)

console.log(xx['15'].offsetTop)
x.scrollTo(0, xx['15'].offsetTop)


 */