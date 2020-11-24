import React, {useState} from 'react';
//import axios from 'axios';
import Table from './Table';



let text = `Despite the frayed coat she wore, she was breathtaking. Some people were dressed in regular clothes but some looked exhausted and unkempt, with glazed eyes and unwashed hair.
“Don’t stare,” Aunt Paula hissed at me. “You might attract their attention.”
I turned around and the adults had already unloaded our few possessions, which were now piled by the boarded-up storefront. We had three tweed suitcases, Ma’s violin case, a few bulky packages wrapped in brown paper, and a broom. There was a large wet spot at the bottom of the front door.
“What is that, Ma?”
She bent close and peered at it.
“Don’t touch that,” Uncle Bob said from behind us. “It’s pee.”
We both sprang backward.
Aunt Paula laid a gloved hand on our shoulders. “Don’t worry,” she said, although I didn’t find her expression reassuring. She looked uncomfortable and a bit embarrassed. “The people in your apartment moved out recently so I haven’t had a chance to look at it yet, but remember, if there are any problems, we will fix them. Together. Because we are family.”
Ma sighed and put her hand on top of Aunt Paula’s. “Good.”
“And I have a surprise for you. Here.” Aunt Paula went to the car and took out a cardboard box with a few items in it: a digital radio alarm clock, a few sheets and a small black-and-white television.
“Thank you,” Ma said.
“No, no,” Aunt Paula replied. “Now we have to go. We’re already late for the factory.”
I heard them drive away and Ma struggled with the keys in front of the looming door. When she finally cracked the door open, the weight of it seemed to resist her until finally it gaped wide to reveal a bare lightbulb glowing like a tooth in its black mouth. The air smelled dank and filled with dust.
“Ma,” I whispered, “is it safe?”
“Aunt Paula wouldn’t send us anywhere unsafe,” she said, but her low voice was laced with a thread of doubt. Although Ma’s Cantonese was usually very clear, the sound of her country roots grew more pronounced when she was nervous. “Give me the broom.”
While I brought our things inside the narrow entryway, Ma started up the stairs first, wielding the broom.

 
“Stay here and keep the door open,” she said. I knew that was so I could run for help.
My pulse pounded in my throat as I watched her climb the wooden stairs. They had been worn by years of use and each step warped, slanting sharply downward to the banister. I worried that a step would give way and Ma would fall through. When she turned the corner on the landing, I lost sight of her and I could only hear the stairs creaking one by one. I scanned our luggage to see if there was anything I could use as a weapon. I would scream and then run upstairs to help her. Images of the tough kids at my old school in Hong Kong flashed through my mind: Fat Boy Wong and Tall Guy Lam. Why wasn’t I big like them? There was some scuffling upstairs, a door clicked open and a few floorboards groaned. Was that Ma or someone else? I strained my ears, listening for a gasp or a thud. There was silence.
“Come up,” she called. “You can close the door now.”
I felt my limbs loosen as if they’d been deflated. I ran up the stairs to see our new apartment.
“Don’t brush against anything,” Ma said.
I was standing in the kitchen. The wind whistled through the two windows on the wall to the right of me, and I wondered why Ma had opened them. Then I saw that they were still closed. It was only that most of the windowpanes were missing or cracked, with filthy shards of glass protruding from the wooden frame. A thick layer of dust covered the small kitchen table and wide sink, which was white and pitted. As I walked, I tried to avoid the brittle bodies of the dead roaches scattered here and there. They were huge, the thick legs delineated by the harsh shadows.
The bathroom was in the kitchen and its door directly faced the stove, which any child knows is terrible feng shui. A section of the dark yellow linoleum floor near the sink and refrigerator had been torn away, revealing the misshapen floorboards underneath. The walls were cracked, bulging in places as if they had swallowed something, and in some spots, the paint layer had flaked off altogether, exposing the bare plaster like flesh under the skin.
The kitchen was attached to one other room, with no door in between. Out of the corner of my eye, I saw a scattering of brown slowly recede into the walls as we walked into the next room: live roaches. There could also be rats and mice hiding in the walls. I took Ma’s broom, which she was still holding, inverted it and slammed the handle hard against the floor.
“Ah-Kim,” Ma said, “you’ll disturb the neighbors.”
I stopped banging and said nothing, even though I suspected we were the only tenants in the building.
The windows of this room`;


// localStorage
//text = 'Line 1. **new-line** Line 2.';

let vocabArray = [];
let span = [];
let sht = ''


const Books = () => {
	/*if(!localStorage.vocab){
		localStorage.setItem('vocab', '{"vocab": []}')
	}*/
	
	const [showTable, setShowTable] = useState(sht);

	const [translate, setTranslate] = useState('')
	/*axios.get('http://localhost/?word=fray', {'Access-Control-Allow-Origin': '*'})
  		.then(function ( response ) {
    	// handle success
    	setTranslate(response.data.translate);
    	//console.log( 'Res', response.data.translate );
  		})*/


	console.log('Books was rendered');
	//text = text.replace(/[^a-zA-Z\'\-\s]/g, function(i){return (<span>{i}</span>)})
	//text = text.replace(/[^a-zA-Z\'\-\s]/g, function(i){return '...'+i})
	let arr2 = text.replace(/[^a-zA-Z\'\-]/g, function(i){return '+++'+i+'+++'})

	let arr = arr2.split(/\+\+\+/);		
	
	
		
	const [len, setLen] = useState(vocabArray.length)
	const [vocab, setVocab] = useState([]);
	//const [vocab, setVocab] = useState(JSON.parse(localStorage.vocab).vocab);

	const clkColor = (e) => {
				

		e.target.style.backgroundColor = e.target.style.backgroundColor ? '' : 'black' ;
		e.target.style.color = e.target.style.color	 ? '' : 'white';
		
		e.target.style.color == 'white' ? vocabArray[e.target.getAttribute('k')] = e.target.innerText : vocabArray[e.target.getAttribute('k')] = ''; 
		span.push(e.target);
		setLen(vocabArray.length)		
		

		//console.log('Color ', e.target.getAttribute('k'), e.target.style.color);
		//console.log(vocabArray);
		//console.log(txt + ' ')
	} 	


	const addVocab = () => {
		setShowTable(' ')

		//console.log('SPAN', span[0].style.color = 'black')
		span.map(function(i){
			i.style.color = '';
			i.style.backgroundColor = ''	
		})
		
		vocab.push(vocabArray.join(' '))
		//localStorage.vocab = '{"vocab": ["' + vocab.toString(', ') + '"]}'
		//console.log('Vocab', vocab)
		

		//console.log('addVocab', vocabArray);
		vocabArray = [];
		setLen(vocabArray.length)
		
	}			

	const clearWords = () => {
		span.map(function(i){
			i.style.color = '';
			i.style.backgroundColor = ''	
		})
		vocabArray = [];
		setLen(vocabArray.length)
		
	}

	const [input, setInput] = useState('asd')
	let w = 0;
	
	return (

	<div className='Books'>
		<Table showTable={showTable} />

		<h1>Girl in Translation ( {Math.round(text.length / 6)} words )</h1>
		<p onClick={ (e) => {
			
			//let z = e.currentTarget.getElementsByTagName('span');
			//console.log('zzz', z)
		} }>
			{translate.split('\n').map( (i, k)=>{

				return (<li key={k}>{i.replace("\\n", ' ')}</li>)
			})} 

		

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
			<br /><br /><button className='btn' onClick={addVocab} disabled={len == 0}>Add to Vocabulary {vocab.length}</button>
			<hr /><br /><button className='btn' onClick={clearWords}>Clean</button>
			<p>Ваш словарь</p>
			<ul>
				{vocab.map(function(i, k){
					return <li key={k}>{i}</li>
				})}
			</ul>
		<p>Конец</p>
	</div>	

/*
+ Сделать что бы слова добавлялись в словарь в правильном порядке - сортировать слова по атрибуту Key.
+ После добавления в словарь, возвращать цвета в исходное значение - либо полность перерисовывать текст либо через массив, по всем элементам.
+ При повторном клике снимать выделение - через проверку на измененный цвет
+ Удалять знаки припинания
+ Добавить кол-во слов в тексте
+ Кнопка addVocab должна быть всегда внизу экрана и не двигаться, и некоторые другие кнопки тоже
- Вплывающее окно с полями для добаления слов в словарь (с подгрузкой из БД - autocomplete)
- Страница на русском
- Плавный переход между анг и рус страницами на тех же местах

- отдельные компоненты под текст, таблицу, кнопки (что бы все отдельно и не часто перерисовывалось)
- разбить компоненты на глупые и с состоянием (функции отдельно и данные отельно)




s.replace(/[^a-z]/g, ' ') все не буквы заменить пробелами
s.replace(/[^a-zA-Z\'\-]/g, ' ')
s.replace(/[^a-zA-Z]/g, '')

s.replace(/[^a-zA-Z\s]/g, function(i){return '...'+ i+ '...'})



{ i.replace(/[^a-zA-Z\s\'\-]/g, function(i){return <span> {i} </span>}) }


return (<span key={k} onClick={clkColor} k={k}> {i} </span>);


s.replace(/[^a-zA-Z\'\-\s]/g, function(i){return '...'+i+'...'}) // рабочий пример
*/



	)
}




export default Books;