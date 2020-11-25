import React, { useEffect, useState } from 'react';
import config from './config';


const Temp = (props) => {
    const [txt, setTxt] = useState('[com]No translate setTxt[/com]' )
    
    useEffect(() => {
        if(props.wordForTranslate){
            getTranslate(config.queryGetWord, setTxt, props.wordForTranslate)
        }
    }, [props])
    
    console.log('wordForTranslate', props.wordForTranslate, props.translationOfaWord)
    // оставляем только [com] & [ex]
    const t = txt.match(/(?=\[com\]).*?(?<=\[\/com\])|(?=\[ex\]).*?(?<=\[\/ex\])/gi, (i) => i);
    // заменяем [] на <>
    const translate = t.map((i) => {
        return i.replace(/\[/g, (i) => {return '<'})
                .replace(/\]/g, (i) => {return '>'})
    })

    //useEffect(console.log('assa'), [props.wordForTranslate])

    // заменяем теги на компоненты
    const toReadableText = (i) => {
        let newText = '';    
        if( /\>\</g.test(i) ) return // если нет [com] или [ex] то ничего не делаем
        if(/\<\/?com\>/g.test(i)){
            newText = i.replace(/\<\/?com\>/g, (i) => {return ''})
            return <Com> <span dangerouslySetInnerHTML={{__html: newText}} />  </Com>
        } 
        if(/\<\/?ex\>/g.test(i)){
            newText = i.replace(/\<\/?ex\>/g, (i) => {return ''})
            return <Ex> <span dangerouslySetInnerHTML={{__html: newText}} />  </Ex>
        } 

        
                
    }

    

    return (
        <div>
            <input type="text" value={props.wordForTranslate} onChange={props.handleChange} />
            <button onClick={props.del}> del </button>
            {/*props.wordForTranslate*/}
            {translate.map( toReadableText )}
            {/*props.translationOfaWord*/}           
        </div>
    )
    
}

const Com = (props) => {
    return <h4>{props.children}</h4>
}

const Ex = (props) => {
    return <li><i>{props.children}</i></li>
}

const getTranslate = (url, func, wordForTranslate) => {
    let translate = {}
    fetch(url+wordForTranslate)
    .then(response => response.json()) // преобразуем ответ в json
	.then(data => {
        //translate = data
        //if(JSON.stringify(data.translate) == 'null') translate.translate = '{"translate": "[com]No translate[/com]"}'
        //translate = JSON.stringify(data.translate) == 'null' ? '{"translate": "[com]No translate[/com]"}' : JSON.stringify(data.translate) ;
        translate = JSON.stringify(data.translate)
        translate = translate == 'null' ? '{"translate": "[com]No translate[/com]"}' : translate;
        
        func(translate)


	}).catch(err => alert(err))
    
    

}

export default Temp;