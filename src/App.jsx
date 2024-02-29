import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
 
    let newTodos = todos.filter(item =>{
      return item.id!==id
    })

    setTodos(newTodos);

  }

  const handleDelete = (e, id) => {
   
    let newTodos = todos.filter(item =>{
      return item.id!==id
    })

    setTodos(newTodos);

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos);
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
   let id = e.target.name;
   let index = todos.findIndex(item => {
    return item.id === id;
   })
   let newTodos = [...todos];
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos)
   }
  
  return (
    <>
      <Navbar />
      <div className="container bg-slate-600 mx-auto my-5 rounded-xl p-5 min-h-[80vh]">
        <div className="addTodo my-5">
          <h1 className='text-lg font-bold'>ADD a todo</h1>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} className='bg-violet-400 hover:bg-slate-500 text-sm font-bold p-3 py-1 text-white rounded-md mx-6'>Add</button>
        </div>
        <h1 className='text-xl font-bold'>Your Todos</h1>
        <div className="todos">
          {todos.map(item => {


            return <div key={item.id} className="todo flex w-1/2 justify-between my-3">
              <input  name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons">
                <button onClick={(e) => {handleEdit(e, item.id)}} className='bg-violet-400 hover:bg-slate-500 text-sm font-bold p-3 py-1 text-white rounded-md mx-1'>Edit</button>
                <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-violet-400 hover:bg-slate-500 text-sm font-bold p-3 py-1 text-white rounded-md mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
