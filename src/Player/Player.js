import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const Player = (props) => {

    const [time, setTime] = useState('00: 00')
    const [s, setS] = useState({'0': 'START'});
    const [oneSub, setOneSub] = useState('No subs')

    useEffect(() => {
      getTranslate('http://localhost/gc.php', setS)
      console.log('USE')
    }, [props])

    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
        let time;
        
        console.log(s);
      
        
       
        setInterval(() => {
          // если нет субтитров снова их загружаем
          //if(s['0'] === 'START') getTranslate('http://localhost/gc.php', setS)

            /*
              показываем первую строку субтитров пока текущее время не превысит его значение
              как только привысит показываем следующую строку
            */
                //time = (1000 * event.target.getCurrentTime()).toFixed();
                time = (1 * event.target.getCurrentTime()).toFixed()
               
                setTime( (1 * event.target.getCurrentTime()).toFixed() + '___' + s[5] )

               // console.log(s['\'' +time+ '\''])
                //console.log(s);
                //console.log('TIME',time, s)
                //setOneSub( s[time] )
                 // console.log('ss', s[time])
               if( s[time] ){
                  setOneSub( s[time] )
                  console.log('ss', s[time])
                }

                
            }, 500)
        
      }
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    return (
        /*
            <iframe id="ytplayer" type="text/html" width="640" height="360"
             src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
            frameborder="0"/>
        */

        <div>
             <YouTube videoId="r1wIff85jF4" opts={opts} onReady={_onReady} />
             <p>Time is: {time} {oneSub}</p>
            
        </div>
    )
}

const getTranslate = (url, setSomeThing) => {
  let translate = {}
  let subs = []
  fetch(url)
  .then(response => response.json()) // преобразуем ответ в json
  .then(data => {
      //translate = data
      //if(JSON.stringify(data.translate) == 'null') translate.translate = '{"translate": "[com]No translate[/com]"}'
      //translate = JSON.stringify(data.translate) == 'null' ? '{"translate": "[com]No translate[/com]"}' : JSON.stringify(data.translate) ;
      //translate = JSON.stringify(data.translate)
      //translate = translate == 'null' ? '{"translate": "[com]No translate[/com]"}' : translate;
      //console.log(data)
      let subs = {}
      let prevTime = ''
      let seconds = ''
      //console.log("KEYS", Object.keys(data))
      for(let currentTime in data){
        seconds = (currentTime/1000).toFixed()
        if(prevTime === seconds){
          subs[prevTime] = data[currentTime] + ' - ' + subs[prevTime]
        }
        prevTime = seconds;
        subs[seconds] = data[currentTime]
        //console.log((currentTime/1000).toFixed(), data[currentTime])
      }
      
      console.log('SUUUBS', subs)
      setSomeThing((prev) => subs)
      return subs;

})//.then( subs => setSomeThing((prev) => subs))
.catch(err => console.log(err + 'Ошибка'))
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