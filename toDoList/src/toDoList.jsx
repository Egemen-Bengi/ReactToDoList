import React, { useEffect, useState } from 'react';
import { Button,Input, Space, DatePicker  } from 'antd';
import './ToDoList.css';
function ToDoList({initialToDos}){
    const [toDo, setToDo] = useState([])
    const [newToDo, setNewToDo] = useState("")
    const [dateString, setDate] = useState("");

    useEffect(() => {
        console.log("initialToDos", initialToDos);
        if (initialToDos && initialToDos.length > 0) {
          const formattedToDos = initialToDos.map(
            (item) => `${item.task}`
          );
          setToDo(formattedToDos);
        }
      }, [initialToDos]);

    function onChangeDate(event){
        if(event !== null){
            const date = event.format("YYYY-MM-DD");
            setDate(date);    
        }
    }

    function onChangeInput(event){
        setNewToDo(event.target.value);
    }

    function addToDo(){
        if(newToDo.trim() !== "" && dateString !== ""){
            setToDo([...toDo, newToDo + " " + dateString]);
            setDate("");
            setNewToDo("");
        }
    }

    function deleteToDo(index){
        const deletedToDoList = toDo.filter((element, i) => i !== index);
        setToDo(deletedToDoList);
    }

    return(
        <div className='to-do-list'>
            <h1>To do list</h1>

            <div className='input-container'>
                <Space.Compact style={{width: '100%'}}>
                    <Input
                        type='primary'
                        placeholder='Yapılacaklar'
                        value={newToDo}
                        onChange={onChangeInput}
                    />
                    <DatePicker onChange={onChangeDate} style={{width: '200px'}}/>
                    <Button type='primary' onClick={addToDo}>Ekle</Button>
                </Space.Compact>
            </div>

            <ol>
                {toDo.map((item, index) => 
                    <li key={index} className='to-do-list-item'>
                        <span>{index + 1}. {item}</span>
                        <Button color="purple" variant="outlined" onClick={() => deleteToDo(index)}>Yapıldı</Button>
                    </li>
                )}
            </ol>
        </div>
    )
}

export default ToDoList