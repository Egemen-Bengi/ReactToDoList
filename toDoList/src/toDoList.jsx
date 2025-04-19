import React, { useEffect, useState } from 'react';
import { Button,Input, Space, DatePicker  } from 'antd';
import './ToDoList.css';
import { SpaceContext } from 'antd/es/space';
function ToDoList({initialToDos}){
    const [toDo, setToDo] = useState([])
    const [newToDo, setNewToDo] = useState("")
    const [dateString, setDate] = useState("");
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredToDo, setFilteredToDo] = useState(toDo);

    useEffect(() => {
        if (initialToDos && initialToDos.length > 0) {
            const aktifToDos = initialToDos
            .filter((item) => item.durum === "TRUE")
            .map((item) => item.task);
            setToDo(aktifToDos);
            setFilteredToDo(aktifToDos)
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

    function onSearchChange(event) {
        setSearchTerm(event.target.value)
    }

    function onSearch() {
        if(searchTerm !== ""){
            const filtered = toDo.filter((item) => 
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredToDo(filtered);
        } else {
            resetSearch();
        }
        
    }

    function resetSearch(){
        setSearchTerm("");
        setFilteredToDo(toDo);
    }

    function addToDo(){
        if(newToDo.trim() !== "" && dateString !== ""){
            setToDo([...toDo, newToDo + " " + dateString]);
            setDate(null);
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
                <Space.Compact style={{width: '100%'}}>
                    <Input
                        placeholder='Aramak için yaz'
                        value={searchTerm}
                        onChange={onSearchChange}
                        style={{flex: 1}}
                    />
                    <Button type='primary' onClick={onSearch}>
                        Search
                    </Button>
                </Space.Compact>
            </div>

            <ol>
                {filteredToDo.map((item, index) => (
                    <li key={index} className="to-do-list-item">
                        {expandedIndex !== index && ( 
                            <>
                                <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setExpandedIndex(index)} 
                                >
                                    {index + 1}. {item}
                                </span>
                            </>
                        )}
                        {expandedIndex === index && (
                            <div className="todo-detail">
                                <span>Yapılacaklar, Tarih: {item}</span>
                                <Button
                                    className="yapıldı-button"
                                    color="purple"
                                    variant="outlined"
                                    onClick={() => deleteToDo(index)}
                                >
                                    Yapıldı
                                </Button>
                                <Button
                                    className="kapat-button"
                                    color="danger"
                                    variant="outlined"
                                    onClick={() => setExpandedIndex(null)}
                                >
                                    Kapat
                                </Button>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default ToDoList