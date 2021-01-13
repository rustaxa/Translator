import React, { useState } from 'react';
import YouTube from 'react-youtube';

const Player = () => {

    const [time, setTime] = useState('00: 00')

    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
        

        setInterval(() => {
                setTime(event.target.getCurrentTime())
                console.log('Time is: ' +  (1 * event.target.getCurrentTime()).toFixed())
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
             <p>Time is: {time}</p>
        </div>
    )
}

export default Player;