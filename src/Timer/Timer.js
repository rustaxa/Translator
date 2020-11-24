import React, {useState, useRef} from 'react';

export default function Timer(){
    //console.log('Render Timer')

    let habit = ['listening', 'reading', 'vocabulary', 'programming', 'sport'].map( (v, index) => {
        return ( <option key={index} value={v}>{v}</option> )
    } );
    let time = [5, 20, 30, 40, 50].map( (v, index) => {
        return ( <option key={index} value={v} >{v}</option> )
    } ) 

    const [currentInterval, setCurrentInterval] = useState([])

    const [totalWorkTime, setTotalWorkTime] = useState(0)
    const [totalRelaxTime, setTotalRelaxTime] = useState(0)
    const [timerData, setTimerData] = useState({
            playing: false,
            totalRelax: 0,
            totalWork: 0,
            currentRelax: 0,
            currentWork: 0,
            interval: false,
        })
    const [currentWorkTime, setCurrentWorkTime] = useState(5)
    const [currentRelaxTime, setCurrentRelaxTime] = useState(0)

    
   
    const [currentHabit, setCurrentHabit] = useState(habit[1])
    
    
    const changeHabit = (e) => {
        setCurrentHabit(e.target.value)
    }

    const changeTime = (e) => {
        setCurrentWorkTime(e.target.value)
        stopTimer();
    }


    const startStop = (playing) => {
        clearInterval(timerData.interval);
        let interval = setInterval( () => {
            console.log('Timer playing', timerData.playing, currentWorkTime)
            if(playing == 'start'){
                
                setCurrentWorkTime((prev) => {
                    setTimerData(prev => {return {...prev, totalWork: prev.totalWork + 1}})
                    if(prev < 1) {clearInterval(interval); startStop('stop');  return 5};
                    
                    return prev - 1
                })
                
                
                
                
            }else{
                setTimerData(prev => { return {...prev, totalRelax: prev.totalRelax + 1}})
            }
        }, 1000 )
            
        setTimerData(prev => { return {...prev, interval}})     
        
    }

    const startTimer = () => {
        //setTimerData(prev => {return {...prev, playing: true}})
        startStop('start')
        console.log('start', timerData.playing)
        
    }

    const stopTimer = () => {
        
        //setTimerData(prev => {return {...prev, playing: false}})
        startStop('stop')
        console.log('stop', timerData.playing);
    }

    useState(()=>{
        
        //console.log('Timer')
        //console.log('useState playing', timerData.playing)
    }, [timerData])
    

    return (
        <div>
            <h3>Timer {currentWorkTime}</h3>
            <select value={currentHabit} onChange={changeHabit}> {habit} </select>
            
            {true && <button className='start' onClick={startTimer}> START </button> }
            {true && <button className='start' onClick={stopTimer}> STOP </button> }
            
            
            <select value={currentWorkTime} onChange={changeTime}> {time} </select>  
            
            
            <p>Время работы {timerData.totalWork}</p>
            <p>Время отдыха {timerData.totalRelax}</p>

            <button>Закончить сессию / Начать сессию</button>
            <p>Общее время предыдущей сессии</p>
        </div>    
    )
}


/*

let isRelaxTime = false;
    
    const [currentHabit, setCurrentHabit] = useState(habits[1])
    
    const [startStop, setStartStop] = useState('start')
    
    
    const [currentTime, setCurrentTime] = useState(times[0])
    
    const [timeWork, setTimeWork] = useState(null)
    const [timeRelax, setTimeRelax] = useState(0)
    const [currentInterval, setCurrentInterval] = useState(null)

    const startTimer = () => {
        setStartStop('stop')
           
        clearInterval(currentInterval)
        
        let time = currentTime;
        let interval = setInterval( () => {
            if(time < 1 ){
                isRelaxTime = true;
                //clearInterval(interval)
                console.log('Time out');
                time = null;
                setTimeWork(null);
                setStartStop('start')
                setTimeRelax(timeRelax + 1)
                
            }
            time--;
            setTimeWork(time);
            console.log(time)
        }, 1000)

        setCurrentInterval(interval)
    }

    const stopTimer = () => {
        setCurrentTime(timeWork)
        setStartStop('start')
        clearInterval(currentInterval)
        
    }


    

    const changeHabit = (e) => {
        clearInterval(currentInterval)
        console.log(currentHabit, currentTime);
        setCurrentHabit(e.target.value)
    }

    const changeTime = (e) => {
        clearInterval(currentInterval)
        console.log(currentHabit, currentTime);
        setCurrentTime(e.target.value)
        setStartStop('start')
    }

*/