import Header from './components/Header';
import { useState, useEffect } from 'react'
import './App.css'

interface Task {
    id: number;
    task: string;
    done: boolean;
}

function App() {
  const [tasks, SetTasks] = useState<Task[]>(() =>{
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const addNewTask = (text:string) =>{
    const newTask = {
        id: Date.now(),
        task: text,
        done: false
      };
      SetTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    SetTasks(tasks.filter(t => t.id !== id))
  }

  const toggleTask = (id:number) => {
    SetTasks(tasks.map(t => t.id === id ? {...t, done: !t.done}: t))
  };

  useEffect(() =>{
    localStorage.setItem('tasks', JSON.stringify(tasks));  
  }, [tasks]);

  const activeTasks = tasks.filter(t => !t.done).length;

  return (
    <div className="App">
      <Header onAddTask={addNewTask} tasksLegth={tasks.length} activeTasks={activeTasks}/>
      <section className="tasksId">
          {[...tasks]
          .sort((a, b) => Number(a.done) - Number(b.done))
          .map(t=>(
            <div key={t.id} className="divTask">
              <p className='divTaskP' style={{opacity:t.done ? 0.5:1}}>
                <input type="checkbox" checked={t.done} onChange={()=>toggleTask(t.id)}/>
                <label style={{textDecoration: t.done ? 'line-through':'none', textDecorationColor: t.done ? '#BF3030' : 'none'}}>{t.task}</label>
                <span className='delete' onClick={() => deleteTask(t.id)}>🗑️</span>
              </p>
            </div>
          ))}  
      </section>
    </div>
  )
}
export default App
