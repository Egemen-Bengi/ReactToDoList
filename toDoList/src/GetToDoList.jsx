import React, { useEffect, useState } from "react";
import ToDoList from "./ToDoList";

const API_URL = "https://v1.nocodeapi.com/bengi/google_sheets/CyzYjDqzmmdOOfFH?tabId=Sayfa1";

const Get = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
    
    };

    return fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(result => { 
            return result;
        })
        .catch(error => {
            console.log('fetch hatası: ', error);
            throw error;
        });
}

const GetToDoList = () => {
    const [toDos, setToDos] = useState([]);

    useEffect(() => {
        const fetchToDos = async () => {
            try {
                const response = await Get();
                setToDos(response.data || []);
            } catch (error) {
                console.error("Error fetching to-do list:", error);
            }
        };

        fetchToDos();
    }, []);

    return <ToDoList initialToDos={toDos} />;
};

export default GetToDoList;