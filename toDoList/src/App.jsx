import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoList from './toDoList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ToDoList></ToDoList>
    </div>
    
  )
}

export default App
