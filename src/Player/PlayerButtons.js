import React, { useState, useEffect } from 'react';

const PlayerButtons = (props) => {
    const click = () => {
        //props.player.pauseVideo()
        if(props.player.getPlayerState() == 2){
            props.player.playVideo()
          }else{
            props.player.pauseVideo()
          }
    }

    return(
        <div>
            <button onClick={click}>play</button>
        </div>
    )
}

export default PlayerButtons;