import React, {useState} from 'react';



const Table = (props) => {
	console.log('TABLE showTbl', props.showTable, 'as')
	let showTbl = props.showTable
	const [displayShow, setDisplayShow] = useState(showTbl)
	let width = window.screen.width > 500 ? '30%': '80%';
	let left = window.screen.width > 500 ? '34%': '8%';
	let val = 'fray'
	let style = {
	 	display: displayShow,
	 	position: 'fixed',
	 	backgroundColor: '#666666',
	 	border: '2px solid',
		margin: '0 auto',
		width: width,
		left: left,
		textAlign: 'justify',
		padding:  '10px'
  
	}
	


	const [word, setWord] = useState('fray');
	const [translate, setTranslate] = useState('');
	const [input, setInput] = useState('fray')

	fetch(`http://192.168.1.66/?word=${input.toLocaleLowerCase()}`)
			.then(response => response.json()) // преобразуем ответ в json
			.then(data => {
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
		
		console.log('display', displayShow)		
	}
	return (
		<div>
			<button onClick={display}>display</button>
			<div className='Table' style={style}>
				<p>Table</p>
				<input onChange={change} value={input}></input><br />
				<h3>{word}</h3> <br/>
				{translate.split('\n').map( (i, k)=>{

					return (<li key={k}>{i.replace("\\n", ' ')}</li>)
				})}
				<button onClick={display}>Add to vocab</button> 				
			</div>
			
		</div>		
	)
}

export default Table;