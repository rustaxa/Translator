import React from 'react';
import Buttons from './Buttons';


const Text = (props) => {

	//let text = props.text.replace(/[^a-zA-Z\'\-]/g, function(i){return '+++'+i+'+++'}).split(/\+\+\+/);	
	return (
		<div className='Books'>
			{props.text}
			<Buttons />
		</div>

	)
}

export default Text;