import React, { useState } from 'react'
import { Button,Input, Space  } from 'antd'
import './ToDoList.css';
function ToDoList(){
    const [toDo, setToDo] = useState(["Halı sahaya git", "Yemek yap", "spor yap"])
    const [newToDo, setNewToDo] = useState("")

    function onChangeInput(event){
        setNewToDo(event.target.value);
    }

    function addToDo(){
        setToDo([...toDo, newToDo]);
        setNewToDo("");
    }

    function deleteToDo(index){

    }

    return(
        <div className='to-do-list'>
            <h1>To do list</h1>

            <div>
                <Space.Compact style={{width: '100%'}}>
                    <Input
                        type='primary'
                        placeholder='Yapılacaklar'
                        value={newToDo}
                        onChange={onChangeInput}
                    />
                    <Button type='primary' onClick={addToDo}>Ekle</Button>
                </Space.Compact>
            </div>

            <ol>
                {toDo.map((item, index) => 
                    <li key={index} className='to-do-list-item'>
                        <span>{item}</span>
                        <Button type='primary' danger onClick={() => deleteToDo(index)}>Yapıldı</Button>
                    </li>
                )}
            </ol>


        </div>
    )
}

export default ToDoList