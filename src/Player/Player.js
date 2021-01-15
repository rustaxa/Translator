import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

const Player = (props) => {

    const [time, setTime] = useState('00: 00')
    const [s, setS] = useState({'0': 'START'});

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
            /*
              показываем первую строку субтитров пока текущее время не превысит его значение
              как только привысит показываем следующую строку
            */
                time = (1000 * event.target.getCurrentTime()).toFixed();
                setTime( (1000 * event.target.getCurrentTime()).toFixed() )
                
                //console.log(s);
                if( s ){

                  console.log('ss', s[time])
                }

                
            }, 100)
        
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
             <p>Time is: {time}</p>
        </div>
    )
}

const getTranslate = (url, setSomeThing) => {
  let translate = {}
  fetch(url)
  .then(response => response.json()) // преобразуем ответ в json
  .then(data => {
      //translate = data
      //if(JSON.stringify(data.translate) == 'null') translate.translate = '{"translate": "[com]No translate[/com]"}'
      //translate = JSON.stringify(data.translate) == 'null' ? '{"translate": "[com]No translate[/com]"}' : JSON.stringify(data.translate) ;
      //translate = JSON.stringify(data.translate)
      //translate = translate == 'null' ? '{"translate": "[com]No translate[/com]"}' : translate;
      //console.log(data)
      setSomeThing(data)


}).catch(err => alert(err))
}


export default Player;