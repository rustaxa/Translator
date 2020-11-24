import React, {useState, useEffect} from 'react';

//import learn from './learn.css';
import Html from '../Html';




 const View= (props) => {

 	//const [words, setWords] = useState(props.words);
 	
 	props.words.forEach( (word) => {
 		word.checked = false;
 	} )


 	
 	//console.log('View', props.words.length);

 	const [x, setX] = useState(0)
		
 	//const [wordTranslate, setWT] = useState({word: 'Всего слов '+words.length})
 	
 	const [end, setEnd] = useState(null)

 	const again = () => {
 		console.log(props.words)
 		/*let checked = props.words.find( (word) => {return word.checked == false} )
 		if(!checked){
 			console.log('end', checked)
 			setEnd('end')
 			console.log(props.words)
 			return
 		} 
 		if(true){
 			setX(x+1)
 			console.log('if')
 		}*/
 		//console.log(words.length)
 		
 		if(props.words.length == 0){
 			console.log('end')
 			setEnd('end')
 			//setX(0)
 			//return;
 		}else if(x < props.words.length-1){

 			// тут подумать
 			console.log('else if')
 			setX(x+1)
 			 			 			
 		}else{
 			console.log('else')
 			setX(0)
 			
 		} 
		
 			
 	}


 	const good = () => {
 		props.words[x].checked = true;
 		again()
 		 /*if(props.words.length == 2){
 			setEnd('end');
 			props.words.splice(x, 1)

 		}else{
 			props.words.splice(x, 1)
 			again()
 			
 		}	
		*/
		

	 		//console.log('length', words.length, 'x', x, words)
 	}
	

	//let zz = JSON.parse(JSON.stringify(word));

	//console.log('zz', zz[0].word, zz[0].checked);
	//console.log('Type', Object.keys(zz[0]))

	//setTimeout(()=>{console.log('Type', Object.keys(window.xx[0]))}, 2000)
	//console.log('Type222', window.xx[0].translate)
	//setTimeout(function(){console.log('Type', window.xx[0].translate)}, 3000)

	//setTimeout(function(){console.log('Type', props.words[0].translate)}, 5000)

	let num = 0;
	return (
		<>
	
			<div className='Vocab'>Vocab</div>
			
			<div className='Word-Translate'>
				<p>Всего слов: {props.words.length}</p>
				<p className='Word'>{end || props.words[x].word}  </p>
				
				<div className='Translate'><Html text={end ||props.words[x].translate}/></div>
				
			</div>

			<div className='Buttons'>
					<span style={{backgroundColor: '#99CC33'}}> back </span>
					<span 
						style={{backgroundColor: '#993366'}}
						onClick={ again }
					> AGAIN </span>
					<span 
						style={{backgroundColor: '#9999FF'}}
						onClick={ good }				
					> GOOD </span>
					<span style={{backgroundColor: '#3366CC'}}> edit </span>
					
					
				</div>
		</>
	)
}


export default View;