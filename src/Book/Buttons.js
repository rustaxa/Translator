import React, {useState} from 'react';

import Vocab from './Vocab';

const Buttons = (props) => {

	let width = window.screen.width > 500 ? '780px': '95%';
	const [showVocab, setShowVocab ]= useState(false);

	let textForVocab = document.getSelection().toString().toLowerCase().trim(); 
		
	const addToVocab = () => {
		setShowVocab(true); // показать словарь

		//document.getSelection().removeAllRanges() // убираем выделение
	}
	
	const clean = () => {
		// убираем выделение
		document.getSelection().removeAllRanges()
	}
	
	return (
		<div className='btn' style={{'width': width}}>
			<div className='btn2'>
				<button onClick={addToVocab}>Add to Vocabulary</button>
				<button onClick={clean}>Clean</button>
			</div>
			{ showVocab && <Vocab showTable='' word={textForVocab} clean={clean} showMe={setShowVocab} /> }	
		</div>

	)
}

export default Buttons;

// брать выделение после вызова словаря