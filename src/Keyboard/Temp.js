import React, { useEffect, useState } from 'react';
import config from './config';
const Com = (props) => {
    return <h4>{props.children}</h4>
}

const Ex = (props) => {
    return <li><i>{props.children}</i></li>
}

const Temp = (props) => {
   //let txt = props.translationOfaWord || '[com]No translate[/com]';
    // оставляем только то что в [com] и [ex]
    //let txt = `{"translate":"[m1][c blue][b]victim[\/b][\/c] [p]UK[\/p] [s]ukvicio003.wav[\/s] [p]US[\/p] [s]eus74846.wav[\/s] \/?v?k.t?m\/ [p]noun[\/p] [[p]C[\/p]][m2][c darkred][b]1.[\/b][\/c] [p]B2[\/p] [com]someone or something that has been hurt, damaged, or killed or has suffered, either because of the actions of someone or something else, or because of illness or chance: [\/com][m3][*]\ufffd [ex]to provide financial aid to hurricane\/flood, etc. victims[\/ex][\/*][m3][*]\ufffd [ex]victims of crime[\/ex][\/*][m3][*]\ufffd [ex]The children are the innocent\/helpless victims [b]of[\/b] the fighting.[\/ex][\/*][m3][*]\ufffd [ex]The new drug might help save the lives of cancer victims.[\/ex][\/*][m3][*]\ufffd [ex]We appear to have been the victims [b]of[\/b] a cruel practical joke.[\/ex][\/*][m3][*]\ufffd [ex]Our local hospital has become the latest victim [b]of[\/b] the cuts in government spending.[\/ex][\/*][m2][c olive][u]Thesaurus[\/u][sup]+[\/sup][\/c]: [ref]^People who receive medical treatment[\/ref][m2][c olive][u]Thesaurus[\/u][sup]+[\/sup][\/c]: [ref]^Experiencing and suffering[\/ref][m1][c darkblue][b]fall victim to [i]sth[\/i][\/b][\/c][m2][c darkred][b]2.[\/b][\/c] [p]F0[\/p] [com]to be hurt, damaged, or killed because of something or someone: [\/com][m3][*]\ufffd [ex]In 1948, Gandhi fell victim to a member of a Hindu gang.[\/ex][\/*][m3][*]\ufffd [ex]The company has fallen victim to increased competition.[\/ex][\/*][m2][c olive][u]Thesaurus[\/u][sup]+[\/sup][\/c]: [ref]^Injuring and injuries[\/ref][m1][c lightgray]\ufffd \ufffd \ufffd[\/c][m2][c olive][u]Extra Examples[\/u][\/c]:[m3][*]\ufffd [ex]The murderer had lured his victim to a deserted house.[\/ex][\/*][m3][*]\ufffd [ex]She claimed to have been a victim of child abuse.[\/ex][\/*][m3][*]\ufffd [ex]They're launching an appeal to raise money for famine victims.[\/ex][\/*][m3][*]\ufffd [ex]Road accident victims make up almost a quarter of the hospital's patients.[\/ex][\/*][m3][*]\ufffd [ex]The victim had received repeated blows to the head and body.[\/ex][\/*]"}`
    const [txt, setTxt] = useState('[com]No translate setTxt[/com]' )
    
    //console.log('!!!!!!!!!!', props.wordForTranslate, txt)
    //getData(setTxt, props.wordForTranslate)
    /*if(props.wordForTranslate){
        getData(setTxt, props.wordForTranslate)
    }*/
    
    useEffect(() => {
       
        //setTxt('[com]No translate setTxt1111' + props.wordForTranslate +  '[/com]')
        if(props.wordForTranslate){
            getTranslate(config.queryGetWord, setTxt, props.wordForTranslate)
        }
    }, [props])
    
    console.log('wordForTranslate', props.wordForTranslate, props.translationOfaWord)
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