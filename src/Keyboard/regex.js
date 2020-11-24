import React from 'react'
import Html from './Html'

let txt = "[m1][c blue][b]everything[/b][/c] [p]UK[/p] [s]ukeve__023.wav[/s] [p]US[/p] [s]everything.wav[/s] /ˈev.ri.θɪŋ/ [p]pronoun[/p][m2][c darkred][b]▸[/b][/c] [p]A2[/p] [com]all things: [/com][m3][*]» [ex]You can't blame him for everything.[/ex][/*][m3][*]» [ex]He's obsessed with Kylie Minogue and collects [b]anything and[/b] everything connected with her.[/ex][/*][m3][*]» [ex]Jane's been unfaithful to Jim three times, but he still loves her [b]in spite of[/b] everything.[/ex][/*][m3][*]» [ex]Money isn't everything [c limegreen](= the most important thing)[/c].[/ex][/*][m3][*]» [ex]His children are everything [b]to[/b] him [c limegreen](= the most important part of his life)[/c].[/ex][/*][m3][*]» [ex]Have you been crying? Is everything all right?[/ex][/*][m3][*]» [ex]The thieves took everything.[/ex][/*][m3][*]» [ex]We did everything we could to save her but she died.[/ex][/*][m3][*]» [ex]We shall do everything [b]necessary[/b] to bring the murderer to justice.[/ex][/*][m3][*]» [ex]They're very busy with their new house and everything [c limegreen](= all the things connected with it)[/c].[/ex][/*][m2][c olive][u]Thesaurus[/u][sup]+[/sup][/c]: [ref]↑Something, anything, nothing, and everything[/ref][m1][c lightgray]• • •[/c][m2][c olive][u]Extra Examples[/u][/c]:[m3][*]» [ex]Rescuers are doing everything they possibly can to free the trapped people.[/ex][/*][m3][*]» [ex]She's new to the job so you can't expect her to know everything yet.[/ex][/*][m3][*]» [ex]Make sure you keep a receipt for everything you buy.[/ex][/*][m3][*]» [ex]Are you sure we've got everything we need for the journey?[/ex][/*][m3][*]» [ex]If I don't wear my glasses, everything is just a blur.[/ex][/*][m2][c olive][u]Common mistake[/u][/c]: [b]everything[/b][m3][c red][b]![/b][/c] [b]Remember:[/b] when [b]every[/b] is followed directly by [b]thing[/b], it is written as one word.[m3][c red][b]![/b][/c] Don't write 'every thing', write [b]everything[/b]:[m3][c red][b]✗[/b][/c] [*][ex]I tell my best friend every thing.[/ex][/*][m3][*]» [ex]I tell my best friend everything.[/ex][/*][m3][c red][b]![/b][/c] [b]Every[/b] and [b]thing[/b] can appear with an adjective in between:[m3][*]» [ex]I tell her every little thing that happens to me.[/ex][/*]"


const Regex = () => {
    txt = txt.
              //replace(/(?<=\[com\]).*?(?=\[\/com\])|(?<=\[ex\]).*?(?=\[\/ex\])/g, (i) => {return '<p>' + i + '</p>'}).
                
                replace(/(com)/g, (i) => {return 'h3'}).
                 replace(/(ex)/g, (i) => {return 'li'}).
                replace(/\]/g, () => {return '>'}).  
                replace(/\[/g, (i) => {return '<'}).                
                match(/(?=\<li\>).*?(?<=\<\/li\>)|(?=\<h3\>).*?(?<=\<\/h3\>)/g, (i) => {return i})
                
                
            //replace(/\]/g, (i) => {return '>'}).
            //replace(/com/g, (i) => {return 'ul'}).
            //replace(/ex/g, (i) => {return 'li'})
    
    
    return ( <><Html text={txt} /> <hr /></>)
}

export default Regex;