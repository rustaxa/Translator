import React, {useState} from 'react';

import learn from './learn.css';
import Html from './Html';



let trnsl = `used to say that something happened or is true, although something else makes this seem not probable
<br /><br />
несмотря на`




 const Learn = (props) => {

 	const [word, setWord] = useState('')
 	const [translate, setTranslate] = useState('')

 	fetch('http://192.168.1.66/myvocab2.php').then(res => res.json()).then(data => {
 		console.log(data[0].word);
 		setWord(data[1].word);
 		setTranslate(data[1].translate)
 	})


	return (
		<div className='Learn'>
			<div className='Vocab'>Vocab</div>
			<div>
				<p className='Word'>{word}</p>
				
				<div className='Translate'><Html text={translate} /></div>
				<div className='Buttons'>
					<span style={{backgroundColor: '#99CC33'}}> back </span>
					<span style={{backgroundColor: '#993366'}}> AGAIN </span>
					<span style={{backgroundColor: '#9999FF'}}> GOOD </span>
					<span style={{backgroundColor: '#3366CC'}}> edit </span>
				</div>
			</div>
		</div>)
}


export default Learn;