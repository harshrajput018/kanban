import '../styles/card.css'
export default function Card({elem}){

    console.log(elem)
    let reducedTitle= elem.title.slice(0,35);
    if(elem.title.length>=35)
    reducedTitle+='...'
    let elemId= `elem-title${elem.id}`
    return (
        <div className="card">
            <div id='card-name'>{elem.name}</div>
            <div id='card-id'>{elem.id}</div>
            <div className={  `card-title ${elemId}` }  onClick={
                
                ()=>{
                    console.log(reducedTitle===elem.title)
                    if(document.getElementsByClassName(elemId)[0].innerText!=elem.title)
                    {
                        console.log('up')
                        document.getElementsByClassName(elemId)[0].innerText=elem.title
                    }
                    else
                    document.getElementsByClassName(elemId)[0].innerText=reducedTitle
                    }}>{reducedTitle}</div>
            {elem.tag.length>0 && elem.tag.map(val=>{
                return(<div id='card-tag'>{val}</div>)
            })}
            
           
        </div>
    )
}