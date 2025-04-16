import React, { useEffect, useState } from 'react';
import { Button,Input, Space, DatePicker  } from 'antd';
import './ToDoList.css';
function ToDoList({initialToDos}){
    const [toDo, setToDo] = useState([])
    const [newToDo, setNewToDo] = useState("")
    const [dateString, setDate] = useState("");

    useEffect(() => {
        if (initialToDos && initialToDos.length > 0) {
            const aktifToDos = initialToDos
            .filter((item) => item.durum === "TRUE")
            .map((item) => item.task);
            setToDo(aktifToDos);
            console.log(aktifToDos);
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
            
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: "post",
                headers: myHeaders,
                redirect: "follow",
                body: JSON.stringify([
                    [newToDo + " " + dateString, "TRUE"]
                ])
            };

            fetch("https://v1.nocodeapi.com/bengi/google_sheets/CyzYjDqzmmdOOfFH?tabId=Sayfa1", requestOptions)
            .then(response => response.json())
            .then(result => { 
                return result;
            })
            .catch(error => {
                console.log('fetch hatası: ', error);
                throw error;
            });
        }
    }

    function deleteToDo(index){
        const deletedToDoList = toDo.filter((element, i) => i !== index);
        setToDo(deletedToDoList);
        const rowId = index + 2;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "put",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify({
                "row_id":rowId,
                "durum":"FALSE"
                })
        };

        fetch("https://v1.nocodeapi.com/bengi/google_sheets/CyzYjDqzmmdOOfFH?tabId=Sayfa1", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("Durum güncellendi:", result);
            })
            .catch(error => {
                console.error("Silme (soft) hatası:", error);
            });
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