import React from 'react';


let text = 'AAA<br /> BBB <br /> CCC <br />'



const Newline = () => {
	let arr = text.split('<br />')
	
	return (
		<p>
			{text.split('<br />').map(function(i, k){
				return (<>{i} <br/></>)
			})}
		</p>
	)
}

export default Newline;