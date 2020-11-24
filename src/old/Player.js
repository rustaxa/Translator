import React, {useState} from 'react';

import YouTube from 'react-youtube';

const Player = () => {
	let idVideo = "rj5xnNgJttI";
	let Youtube;
	const [w, setW] = useState(window.innerWidth) 

	let opts = {
      height: '280',
      width: '360',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        enablejsapi: 1,
        cc: 1,
        controls: 1,
        cc_load_policy: 1 
      }
    };

    const clk = () => {
    	//Youtube.pauseVideo()
    	Youtube.seekTo(Youtube.getCurrentTime()-3, true);
    	console.log(Youtube.getCurrentTime())
    }

    const pause = () => {
    	Youtube.pauseVideo();
    }

    const play = () => {
    	Youtube.playVideo();
    }

    const speed = () => {
    	console.log(Youtube.getIframe())
    }

    const onReady = (e) => {
    	Youtube = e.target;
    }

	return (
		<div className='Player'>
			<YouTube videoId={idVideo} opts={opts} onReady={onReady}/>
			<button onClick={clk}>BACK</button>
			<button onClick={pause}>PAUSE</button>
			<button onClick={play}>PLAY</button>
			<button onClick={speed}>SPEED</button>
		</div>
	)
}

export default Player;