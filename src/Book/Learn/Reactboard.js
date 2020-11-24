import React from 'react';

import Keyboard from 'react-virtual-keyboard';

const Reactboard = (props) => {
    return (
        <Keyboard 
  value={props.input}
  name='keyboard'
  options={{
    type:"input",
    layout: "qwerty",
    alwaysOpen: true,
    usePreview: false,
    useWheel: false,
    stickyShift: false,
    appendLocally: true,
    color: "light",
    updateOnChange: true,
    initialFocus: true,
    display: {
      "accept" : "Submit"
    }
  }}
  onChange={props.onInputChanged}
  onAccepted={props.onInputSubmitted}
  
/>
    )
}

export default Reactboard;