import React, {useState, useEffect, Children} from 'react'
import './modal-window.css'

window.zz = 1

const ModalWindow = (props) => {
    console.log("Render ModalWindow")
    let qq = window.zz;
    const [style, setStyle] = useState({'visibility': props.config.visibility})
    
    useEffect(() => {
        console.log('Render ModalWindow')
        setStyle({'visibility': props.config.visibility})
    }, [props, qq])
    

    const hide = (e) => {

        console.log('HIDE', style.opacity)
        setStyle({'visibility': 'hidden'})
        document.body.style.overflowY = ''
    }


    const  openHideModalWindow = () => {
        
        let hide = style.visibility == 'hidden' ? '' : 'hidden' 
        setStyle(
            {'visibility': hide}
        );
    }

   return (
        <div id='m'>
            <button onClick={openHideModalWindow}>Показать  / скрыть окно</button>
            
            <div className='ModalWindow' style={style}>
                    <div id='modal-top'>
                        <p className='name-modal-window'>
                            {props.config.name}  
                        </p>  
                        <p className='button-close'>
                            <button onClick={ hide }>X</button>
                        </p>
                    </div>
                
                {props.children}
                

                
            </div>    
       </div>
   )
    

}



export default ModalWindow;

/*

цепочка вызовов
function sum(x){
    var c = 0;
      
    console.log(c+=x)
    return function(x){return sum(c+=x)}
}

sum(1)(2)(3)


*/