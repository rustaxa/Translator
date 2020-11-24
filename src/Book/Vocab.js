import React, {useState} from 'react';
import Html from './Html';



let sht = 'none'

const Vocab = (props) => {	
	//console.log('TABLE showTbl', props.showTable, 'as')
	
	console.log('WORDS', props.word.trim())
	let showTbl = props.showTable;
	const [displayShow, setDisplayShow] = useState(showTbl)
	let width = window.screen.width > 500 ? '30%': '80%';
	let left = window.screen.width > 500 ? '34%': '8%';
	let val = 'fray'


	const [idWord, setIdWord] = useState('')
	
	let style = {
	 	display: displayShow,
	 	position: 'fixed',
	 	backgroundColor: '#666666',
	 	border: '2px solid',
		margin: '0 auto',
		top: '10px',
		width: width,
		left: left,
		textAlign: 'justify',
		padding:  '10px'
  
	}
	


	const [word, setWord] = useState('fray');
	const [translate, setTranslate] = useState('');
	//const [input, setInput] = useState('fray')
	const [input, setInput] = useState(props.word.trim().toLocaleLowerCase())

	fetch(`http://192.168.1.66/?word=${input.toLocaleLowerCase()}`)
			.then(response => response.json()) // преобразуем ответ в json
			.then(data => {
				setIdWord(data.id)			
		  		setWord(data.word)
		  		setTranslate(data.translate) // выводим в консоль результат выполнения response.json()
			})
			.catch(console.log("FALSE"))

	const change = (e) => {
		//fetch(`http://192.168.1.66/?word=${e.target.value.toLocaleLowerCase()}`)
		fetch(`http://192.168.1.66/?word=${input.toLocaleLowerCase()}`)
			.then(response => response.json()) // преобразуем ответ в json
			.then(data => {
		  		setWord(data.word)
		  		setTranslate(data.translate) // выводим в консоль результат выполнения response.json()
			})
			.catch(console.log("FALSE"))
		console.log(e.target.value)
		setInput(e.target.value);
	}

	const display = () => {
		if(displayShow == 'none'){
			setDisplayShow('');
		}else{
			setDisplayShow('none');
		}
		props.clean();
		props.showMe(false);
		console.log('display', displayShow)
		fetch(`http://192.168.1.66/addword2.php?id_text=1&id_word=${idWord}`)		
	}


	const cancel = () => {props.showMe(false);}
	return (
		<div>
			<button onClick={display}>display</button>
			<div style={style}>
				<p>Table</p>
				<input onChange={change} value={input}></input><br />
				<h3>{word}</h3> <br/>
				<Html text={translate} />
				<br/>
				<button onClick={display}>Add to vocab server</button> 		
				<button onClick={cancel}>Cancel</button> 			
			</div>
			
		</div>		
	)
}

export default Vocab;