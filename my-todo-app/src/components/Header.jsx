import { useState } from "react";
import selfie from '/img/selfie_1.png'

function Header({onAddTask, tasksLegth, activeTasks}) {

    const [inputValue, setInpuValue] = useState("");
    const handlBtn = () =>{
        if(inputValue.trim()){
            onAddTask(inputValue);
            setInpuValue("");
        }
    }

    return (
        <section>
            <main>
                <h1>My tasks: {activeTasks}</h1>
                <div className="button_icon_main"><input type="text" id="inputId" placeholder="Type your task here..." value={inputValue} 
                onChange={(e) => setInpuValue(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handlBtn()}/>
                    <div className="button_icon" id="addId" onClick={handlBtn}><span
                        className="material-symbols-outlined">add</span><button>Add</button></div>
                </div>
                {tasksLegth === 0 && (
                <div className="img" id="img"><img src={selfie} alt="selfie" />
                    <p>Empty as my motivation on Monday 😅.<br />Let’s start adding stuff!</p></div>)}
            </main>
            
        </section>
    )
}

export default Header;