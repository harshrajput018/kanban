import Card from './card';
import { useEffect, useState } from 'react'
import '../styles/layout.css'
export default function Layout() {

    const [data, setData] = useState([])
    const [users, setUsers] = useState([])

    const [status, setstatus] = useState(['Todo', 'Backlog', 'In progress'])
    const [priority, setPriority] = useState(['No priority', 'Low', 'Medium', 'High', 'Urgent'])
    const [names, setnames] = useState();

    useEffect(() => {
        console.log('iii')
        if (localStorage.getItem('selection')) {
            setSelection(localStorage.getItem('selection'));
            document.getElementById('group').value = localStorage.getItem('selection')
        }

        fetch('https://api.quicksell.co/v1/internal/frontend-assignment').then(res => res.json()).then(res => { setData(res.tickets); let arr = res.tickets.map(elem => (elem.userId)); let uniqueItems = [...new Set(arr)]; setUsers(uniqueItems); setnames(res.users) })
    }, [])








    const [selection, setSelection] = useState('None')

    const [order, setOrder] = useState('None')

    function handleSelectChange(e) {
        localStorage.setItem('selection', e.target.value)
        setSelection(e.target.value);

    }

    function handleOrderChange(e) {

        setOrder(e.target.value);


    }

    console.log(selection)
    console.log(order)

    useEffect(()=>{

        localStorage.setItem('toggle',false)
        console.log('daada')

    },[])

    


    return (
        <div>


            <div style={{height:'fit-content',padding:'0'}} className='btns'>
                <button style={{fontSize:'0.75rem'}} id='toggle' onClick={() => {
                    if (localStorage.getItem('toggle')==='false') {
                        document.getElementsByClassName('oop')[0].style.transform = 'scale(1)';
                        document.getElementsByClassName('oop')[1].style.transform = 'scale(1)'
                        localStorage.setItem('toggle',true)
                    }
                    else {
                        {
                            localStorage.setItem('toggle',false)
                            document.getElementsByClassName('oop')[0].style.transform = 'scale(0)';
                            document.getElementsByClassName('oop')[1].style.transform = 'scale(0)'
                        }
                    }
                }}>Display</button>
                <select id="group" className='oop' onChange={handleSelectChange}>
                    <option value="None">None</option>
                    <option value="Status">Status</option>
                    <option value="User">User</option>
                    <option value="Priority">Priority</option>
                </select>

                <select name="order" className='oop' onChange={handleOrderChange} id="order">
                    <option value="None">None</option>
                    <option value="priority">priority</option>
                    <option value="title">title</option>
                </select>
            </div>

            <div className='display container-div' >

                {selection === 'Status' && <div className='user each' style={{ display: 'flex', justifyContent: "flex-start", overflow: 'scroll', gap: '7rem', width: 'fit-content',  }}>
                    {status.map(elem => {
                        return <div style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div id='layout-title'>{elem}</div>
                                <div style={{ display: 'flex', width: '10%', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>+</div>
                                    <div>...</div>
                                </div>

                            </div>

                            <div style={{    overflow:'scroll', height:'75vh',  }}>
                                {data.length > 0 && data.filter(val => elem === val.status).sort((a, b) => (order === 'title' ? a.title.toLowerCase().localeCompare(b.title.toLowerCase()) : a.priority - b.priority)).map(e => {
                                    let obj = { ...e };
                                    obj.name = names.find(n => n.id === e.userId).name;
                                    return (<Card elem={obj} key={e.id} />);
                                })}
                            </div>
                        </div>
                    })}
                </div>}


                {selection === 'User' && <div className='user each' style={{ display: 'flex', justifyContent: "flex-start", overflowX: 'scroll', gap: '7rem', width: 'fit-content' }}>
                    {users.length && users.map(elem => {
                        return <div  style={{ display: 'flex', flexDirection: 'column', overflowY: 'scroll', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div id='layout-title'>{names.find((n => n.id === elem)).name}</div>
                                <div style={{ display: 'flex', width: '10%', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>+</div>
                                    <div>...</div>
                                </div>

                            </div>

                            <div style={{    overflow:'scroll', height:'75vh',  }}>

                                {data.length > 0 && data.filter((val => (elem === val.userId))).sort((a, b) => order === 'title' ?
                                    a.title.toLowerCase().localeCompare(b.title.toLowerCase()) : a.priority - b.priority).map(e => { let obj = { ...e }; obj.name = names.find(n => n.id === e.userId).name; return (<Card elem={obj} />) })}

                            </div>
                        </div>
                    })}
                </div>}

                {selection === 'Priority' && <div className='user each' style={{ display: 'flex', justifyContent: "flex-start", gap: '7rem', overflowX: 'scroll', width: 'fit-content' }}>
                    {priority.length && priority.map(elem => {
                        return <div  style={{ display: 'flex', flexDirection: 'column', overflow: 'auto', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div id='layout-title'>{elem}</div>
                                <div style={{ display: 'flex', width: '10%', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>+</div>
                                    <div>...</div>
                                </div>

                            </div>
                            <div style={{    overflow:'scroll', height:'75vh',  }}>

                                {data.length > 0 && data.filter((val => (elem === priority[val.priority]))).sort((a, b) => order === 'title' ?
                                    a.title.toLowerCase().localeCompare(b.title.toLowerCase()) : a.priority - b.priority).map(e => { let obj = { ...e }; obj.name = names.find(n => n.id === e.userId).name; return (<Card elem={obj} />) })}

                            </div>
                        </div>
                    })}
                </div>}

            </div>


        </div>
    )
}