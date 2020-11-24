import React, {useState, useEffect, useRef} from 'react';
import View from './View';
import './learn.css';
import axios from 'axios';
import Reactboard from './Reactboard';

//import { getSubtitles } from 'youtube-captions-scraper';
import getSubtitles from './caps';
import YouTube from 'react-youtube';
//let words = 'asd';

import Url from 'url-parse';

//let url = new Url('https://www.youtube.com/watch?v=wkvsgit5v8U&t=1s');
//urlParams.get('id')

 const Modal = (props) => {
	
	let urlParams = new URLSearchParams(window.location.search);
	//let id = urlParams.get('id') || 'ghTwo5Kvbmo'
	
	
	const [id, setId] = useState(urlParams.get('id') || 'ghTwo5Kvbmo') 
			
	const [YTplayer, setYTplayer] = useState({})

	const [title, setTitle] = useState('Loading...')

 	const [words, setWords] = useState([{}]);
	
	const [subs, setSubs] = useState('Loading....')

	const [currentID, setCurrentID] = useState('')

	const [caps2, setCaps2] = useState(['Loading...'])

	const [cleanTimeout, setCleanTimeout] = useState(0)

	
	
	let scr = useRef(null) // scroll
	let yt = useRef(null)
	useEffect( () => {
		getData(setWords);
		//let urlParams = new URLSearchParams(window.location.search);
		let ids = urlParams.get('id') || 'ghTwo5Kvbmo'
		//getCaps(ids, setCaps2)
		
	}, [] )



	
	console.log('Modal', words.length)
	
	let opts = {
		height: window.innerWidth > 1000 ? '450px': window.innerWidth,
		width: '100%',
		playerVars: {
		  // https://developers.google.com/youtube/player_parameters
		  autoplay: 0,
		  controls: 1,
		  
		  modestbranding: 0
		},
	}



	

	//setTimeout(setCaps2, 500, caps2, YTplayer)
	const setCaps = (caps2, YTplayer, currentTime) => {
		
	}
	


	const play = (event) => {
		console.log(event.target);
		//console.log('ID', YTplayer.getVideoData().video_id)
		let vieoID = YTplayer.getVideoData().video_id
		if(currentID !== vieoID){
			clearTimeout(cleanTimeout)
			getSubtitles({
				videoID: vieoID, // youtube video id
				lang: 'en' // default: `en`
				}).then(captions => {
					let caps = []
					
					captions.forEach( (i) => {
						if( caps[ Math.round(i.start) ] ){
							caps[ Math.round(i.start) ] += i.text 
						}else{
							caps[ Math.round(i.start) ] = i.text
						} 
					} );	
						
					console.log('CAPS', caps.length)
					setCaps2(caps)
				
					////////////////////////////
					scr.current.scrollTo(0, 0)
					let scrollY = []
					let y = -48
					caps.forEach( (i, idx) => {
						y+=24
						scrollY[idx] = y; 
					} )
					console.log('YYY', scrollY)
					console.log('CCCCAPS',caps)
					let s
					let timeOut = setInterval( () => { 
						
						console.log('Length', caps2.length)
						//console.log( window.caps[ Math.round(event.target.getCurrentTime()) ] ) 
						//s = window.caps[ Math.round(event.target.getCurrentTime()) ]
						s = caps[ Math.round(YTplayer.getCurrentTime()) ]
						// бывает так что текущее время равно нулю
						// проверка на то что есть ли субтитры вообще и текущее время не равно нулюсв юю
						if(s && YTplayer.getCurrentTime().toFixed(2) > 0){
							setSubs(s)
							scr.current.scrollTo({top: scrollY[Math.round(YTplayer.getCurrentTime())], behavior: "smooth"})
						}
					}, 200)
					setCleanTimeout(timeOut)
		});
			}
	}

	const redy = (event) => {
		setYTplayer(event.target)
		console.log('REDY')
		
		console.log(event.target.getOptions('cc'));
		//console.log('YT',YTplayer)
	}

	//setTimeout(console.log, 10000, YTplayer)

	const ddclick = (event, self) => {
		console.log('EVENT', event.clientX )
		console.log(yt)
		
		//console.log('player', YTplayer)
		YTplayer.pauseVideo()
		console.log('YouTube', YTplayer.getVideoData().title)
		//alert('asd')
		
	}

	let styleTxt = {
		textDecoration: 'none'
	}	

	const color = (e) => {
		e.preventDefault()
		e.target.style.backgroundColor = 'green'
	}

	let txt = "Despite the frayed coat she wore, she was breathtaking. Some people were dressed in regular clothes but some looked exhausted and unkempt, with glazed eyes and unwashed hair. “Don’t stare,” Aunt Paula hissed at me. “You might attract their attention.” I turned around and the adults had already unloaded our few possessions, which were now piled by the boarded-up storefront. We had three tweed suitcases, Ma’s violin case, a few bulky packages wrapped in brown paper, and a broom. There was a large wet spot at the bottom of the front door. “What is that, Ma?” She bent close and peered at it. “Don’t touch that,” Uncle Bob said from behind us. “It’s pee.” We both sprang backward. Aunt Paula laid a gloved hand on our shoulders. “Don’t worry,” she said, although I didn’t find her expression reassuring. She looked uncomfortable and a bit embarrassed. “The people in your apartment moved out recently so I haven’t had a chance to look at it yet, but remember, "				
				.split(" ")
				.map( (i, k) => {
					return <span 
								style={styleTxt} 
								href='#' 
								key={k}
								onMouseDown={ (e) => {color(e)} }
								> {i} </span>	
				} );
	const ref = React.createRef()
	//let scr = React.createRef()
	const vocab = useRef(null);
	
	return (
		
		
		<div className='Learn'>
			
			
			
			<hr />
			cd 
			<input ref={ref} placeholder="youtube-url" readonly 
					onFocus={ (e) => {} }
					onChange={ (e)=>{ let id = e.target.value.split('v=')[1] || e.target.value.split('be/')[1];
								getCaps( id, setCaps2);
								setId(id) } }/>
			
			<button onClick={ () => { console.log(ref.current.value = '');  } }>Clear</button>
			
			<h1> { title } </h1>
			

			<YouTube videoId={id} opts={opts} onReady={(event)=>{redy(event)}} ref={yt} onPlay={play} onPause={()=>{vocab.current.focus();}}/>
			<h2 onClick={ (e) => { ddclick(e) } }>{ subs }</h2>

			<Reactboard />

			<input ref={vocab} placeholder="word to translate" onBlur={() => {vocab.current.value = ''; }}/>


			<button onClick={ () => { YTplayer.pauseVideo(); vocab.current.focus();  } }>VOCAB</button>

			<div style={{overflow: 'auto', height: '100px', textAlign: 'center'}} 
				id='d'
				onClick={ (e) => {console.log('TTT', e.target) } }
				ref={scr}
				
			>
			
				<div >
								
					{caps2.map( (i, idx) => {
						if(i !== 'z') 	return <p style={{height: '24px', padding: '0', margin: '0'}} key={idx} > {i} </p>
						} )}
					
					<p id='end'>the end</p>
				</div>
				
			</div>
			
			
			
			{ words && <View words={words}/>}
				
		</div>
		)
}


/////////////////////////////
function getData(setWords) {
	axios.get('http://192.168.1.66/myvocab2.php')
		  .then(function (response) {
		    // handle success
		    //console.log('Modal', response.data);
		    response.data.pop();
		    setWords( response.data)
		  })
}

function getCaps(id='ghTwo5Kvbmo', setCaps2){
	getSubtitles({
		videoID: id, // youtube video id
		lang: 'en' // default: `en`
		}).then(captions => {
			let caps = []
			
			captions.forEach( (i) => {
				if( caps[ Math.round(i.start) ] ){
					caps[ Math.round(i.start) ] += i.text 
				}else{
					caps[ Math.round(i.start) ] = i.text
				} 
			} );	
				
			console.log('CAPS', caps.length)
			setCaps2([...caps])
		});
}




// d= document.getElementById('d'); x = 0; d.scrollTo(0, x+=10)
// d.scrollTo({top: x+=18, behavior: "smooth"})

//setInterval(()=>{d.scrollTo(0, x+=10)}, 300)

//elem.getBoundingClientRect() координаты
export default Modal