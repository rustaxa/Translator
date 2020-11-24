import React, {useState} from 'react';

import Text from './Text';
import Buttons from './Buttons';

import getText from './getText';

import Learn from './Learn/';

const Book = () => {

	const [text, setText] = useState(getText)

	return (
		<div>
			
			<Learn />	
			<h1>BOOKS</h1>
			
			<Text text={text}/>
			
			
		</div>

	)
}

export default Book;