import { useEffect, useState } from "react";
import ToDoList from "./toDoList";

const API_URL = "https://v1.nocodeapi.com/bengi/google_sheets/WpUFJCNWnPUIEThh";

function GetToDoList() {
    const [toDos, setToDos] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("API isteği başarısız oldu.");
                }
                return res.json();
            })
            .then((data) => {
                const items = data.data.map((row) => ({
                    id: row[0],
                    task: row[1],
                    date: row[2],
                }));
                setToDos(items);
            })
            .catch((error) => {
                console.error("Veri alınırken bir hata oluştu:", error);
            });
    }, []);

    return (
        <ToDoList initialToDoList={toDos} />
    );
}

export default GetToDoList;