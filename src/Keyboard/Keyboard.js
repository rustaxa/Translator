import React, {useState, useEffect} from 'react';
import config from './config';
import text from './text'
import Html from './Html'
import Temp from './Temp'
import Regex from './regex'
import  './keyboard.css';

import ModalWindow from './modalWindow';
import Translate from './Translate';


const Keyboard = () => {
    console.log('Render Keyboard') 
    
    let arr2 = text.replace(/[^a-zA-Z\'\-]/g, function(i){return '+++'+i+'+++'})

	let arr = arr2.split(/\+\+\+/);	
    
    let w = 0;

    let vocabArray = [];
    let span = [];
    const [len, setLen] = useState(vocabArray.length);
    const [slovo, setSlovo] = useState({word: 'empty', translate: '[com]No translate[/com]', wordtype: 'empty'})
    //const [slovo, setSlovo] = useState({word: 'empty', translate: 'empty', wordtype: 'epty'})
    const [y, setY] = useState(0)
    const [visibility, setVisibility] = useState('hidden')
    const [clickedWord, setClickedWord] = useState('');

    const [tr, setTr] = useState('[com]No translate from Keyboard[/com]')

    const [newWord, setNewWord] = useState(0)

    const [propsModalWindow, setPropsModalWindow] = useState({
        visibility: 'hidden',
        name: 'Перевод'
    })

    useEffect(() => {
        console.log('propsModalWindow', propsModalWindow)
    }, [newWord, tr])

    let style = {
        //top: y+'px',
        left: window.innerWidth/2 - 150 + 'px',
        visibility
    }

    const clkColor = (e) => {
        document.body.style.overflowY = 'hidden'

        console.log('propsModalWindow', propsModalWindow)
        setPropsModalWindow({
            visibility: '',
            name: 'Перевод'
        })
        setClickedWord(e.target.innerText.toLowerCase())            
        setVisibility('visible');

        setY(e.screenY+75);
        /*
		e.target.style.backgroundColor = e.target.style.backgroundColor ? '' : 'black' ;
		e.target.style.color = e.target.style.color	 ? '' : 'white';
		
		e.target.style.color == 'white' ? vocabArray[e.target.getAttribute('k')] = e.target.innerText : vocabArray[e.target.getAttribute('k')] = ''; 
		span.push(e.target);
		setLen(vocabArray.length)		
        */
        getData(setSlovo, e.target.innerText.toLowerCase());
        
        
        console.log('Get Data', tr)
        console.log('SLOVO', slovo)
        
		//console.log('Color ', e.target.getAttribute('k'), e.target.style.color);
		//console.log(vocabArray);
		//console.log(txt + ' ')
	} 	

    const handleChange = (e) => {
        setClickedWord(e.target.value)
        getData(setSlovo, e.target.value.toLowerCase());
        
    }
    
    const del = (e) => {
        let word = clickedWord.substring(0, clickedWord.length - 1);
        setClickedWord(word)
        getData(setSlovo, word.toLowerCase());
    }

    
    
    return (
       
        <div id='main'>
            
            <ModalWindow config={propsModalWindow}>
                 <Temp 
                    //translationOfaWord={slovo.translate && slovo.translate.toString()} 
                    //translationOfaWord={`{"translate":"[m1][c blue][b]victim[\/b][\/c] [p]UK[\/p] [s]ukvicio003.wav[\/s] [p]US[\/p] [s]eus74846.wav[\/s] \/?v?k.t?m\/ [p]noun[\/p] [[p]C[\/p]][m2][c darkred][b]1.[\/b][\/c] [p]B2[\/p] [com]someone or something that has been hurt, damaged, or killed or has suffered, either because of the actions of someone or something else, or because of illness or chance: [\/com][m3][*]\ufffd [ex]to provide financial aid to hurricane\/flood, etc. victims[\/ex][\/*][m3][*]\ufffd [ex]victims of crime[\/ex][\/*][m3][*]\ufffd [ex]The children are the innocent\/helpless victims [b]of[\/b] the fighting.[\/ex][\/*][m3][*]\ufffd [ex]The new drug might help save the lives of cancer victims.[\/ex][\/*][m3][*]\ufffd [ex]We appear to have been the victims [b]of[\/b] a cruel practical joke.[\/ex][\/*][m3][*]\ufffd [ex]Our local hospital has become the latest victim [b]of[\/b] the cuts in government spending.[\/ex][\/*][m2][c olive][u]Thesaurus[\/u][sup]+[\/sup][\/c]: [ref]^People who receive medical treatment[\/ref][m2][c olive][u]Thesaurus[\/u][sup]+[\/sup][\/c]: [ref]^Experiencing and suffering[\/ref][m1][c darkblue][b]fall victim to [i]sth[\/i][\/b][\/c][m2][c darkred][b]2.[\/b][\/c] [p]F0[\/p] [com]to be hurt, damaged, or killed because of something or someone: [\/com][m3][*]\ufffd [ex]In 1948, Gandhi fell victim to a member of a Hindu gang.[\/ex][\/*][m3][*]\ufffd [ex]The company has fallen victim to increased competition.[\/ex][\/*][m2][c olive][u]Thesaurus[\/u][sup]+[\/sup][\/c]: [ref]^Injuring and injuries[\/ref][m1][c lightgray]\ufffd \ufffd \ufffd[\/c][m2][c olive][u]Extra Examples[\/u][\/c]:[m3][*]\ufffd [ex]The murderer had lured his victim to a deserted house.[\/ex][\/*][m3][*]\ufffd [ex]She claimed to have been a victim of child abuse.[\/ex][\/*][m3][*]\ufffd [ex]They're launching an appeal to raise money for famine victims.[\/ex][\/*][m3][*]\ufffd [ex]Road accident victims make up almost a quarter of the hospital's patients.[\/ex][\/*][m3][*]\ufffd [ex]The victim had received repeated blows to the head and body.[\/ex][\/*]"}`} 
                    
                   // translationOfaWord={ tr }
                    
                    wordForTranslate={clickedWord.toString()}
                    
                    del={del}
                    handleChange={handleChange} 
                    />
                    
            </ModalWindow>
                 
            <p>
              
            <hr />
                          
            {arr.map(function(i, k){
				w++;
				if(w > 200 && i === '.'){
					w = 0;
					return (
						<>
							<span key={k} onClick={clkColor} k={k} >{i}</span>
							<div>
							</div> &nbsp;&nbsp;
						</>)
				}
				return (<span key={k} onClick={clkColor} k={k} >{i}</span>);
			})}
            </p>
        </div>
    )
}

console.log('CONFIG', config.getWord);

const getData = (func, target) => {
    
    //fetch(`http://192.168.1.66/?word=${target}`)
    fetch(config.queryGetWord+target)
    .then(response => response.json()) // преобразуем ответ в json
	.then(data => {
        console.log('DATA FUNC ЛУН', data);
        //data.translate = data.translate.replace(/[0-9>]./g, function(i){return '<hr/>'})
        //data.definition = data.definition.replace(/[0-9>]./g, function(i){return '<hr/>'})
        func(data);// выводим в консоль результат выполнения response.json()
	})
    
    

}

/* появляющийся словарь
    <div id='vocab' style={style} onDoubleClick={()=>{setVisibility('')}}>
                
                <p> Слов в словаре {newWord}
                <p style={{textAlign: 'center'}} onClick={ ()=>{setVisibility('hidden')} }><button>close</button></p>
                    <input type="text" value={clickedWord} onChange={handleChange} />
                    <button onClick={del}> del </button>
                    </p>
                            <Html text={slovo.translate && slovo.translate.toString()
                                                            .replace(/(com)/g, (i) => {return 'h3'})
                                                            .replace(/(ex)/g, (i) => {return 'li'})
                                                            .replace(/\]/g, () => {return '>'})
                                                            .replace(/\[/g, (i) => {return '<'})
                                                            
                                                            .match(/(?=\<li\>).*?(?<=\<\/li\>)|(?=\<h3\>).*?(?<=\<\/h3\>)/g, (i) => {return i})
                                                            
                                                            
                                                            }  /> 
                     
                <hr />
                <p style={{textAlign: 'center'}} onClick={ ()=>{setVisibility('hidden'); setNewWord(newWord + 1)} }><button>+</button></p>
                <p style={{textAlign: 'center'}} onClick={ ()=>{setVisibility('hidden')} }><button>close</button></p>
            </div>

*/

export default Keyboard;