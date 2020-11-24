import React from 'react';



const  Html = (props) =>{
  return <div dangerouslySetInnerHTML={{__html: props.text}} />;
}

export default Html;