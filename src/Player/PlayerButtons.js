import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
const PlayerButtons = (props) => {
    const click = () => {
        //props.player.pauseVideo()
        if(props.player.getPlayerState() == 2){
            props.player.playVideo()
          }else{
            props.player.pauseVideo()
          }
    }

    const replay = () => {
        let time = props.player.getCurrentTime() - 5
        props.player.seekTo(time, true)
        props.player.playVideo()
    }


    return(<>
        <div>
            <button onClick={click}>play</button>
        </div>
        
        <ButtonGroup style={{'opacity': '0'}} variant="contained" aria-label="outlined primary button group">
            <Button onClick={click}><PlayArrowIcon />Play</Button>
            <Button>Repeat</Button>
            <Button>Back (5sec)</Button>
            
        </ButtonGroup>
            
            <Button style={{'opacity': '0'}}><PlayArrowIcon onClick={click}/></Button>
            <Button onClick={click}><PlayCircleFilledWhiteIcon fontSize="large" /></Button>
            <Button><ReplayCircleFilledIcon fontSize="large" onClick={ replay }/></Button>
        </>
    )
}

export default PlayerButtons;