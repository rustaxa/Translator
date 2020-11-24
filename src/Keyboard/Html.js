import React from 'react';



const  Html = (props) =>{
  //let txt = props.text.replace(/[a-z]/g, function(i){return '<i>'+i+'</i>' })
  
  let txt = props.text;

  return <div className='ModalWin' dangerouslySetInnerHTML={{__html: txt}} />;
}

export default Html;