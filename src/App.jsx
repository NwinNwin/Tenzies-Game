import React, {useState, useEffect} from "react";
import './App.css';
import Die from './components/Die';

function App() {
  const numArray = [0,0,0,0,0
                    ,0,0,0,0,0];
  
  const [die, setDie] = useState(allNewDice())

  function allNewDice(){
    return numArray.map(ele => Math.floor(Math.random() * 6) + 1)
  }

  function handleButtonClick(){
    setDie(prev => allNewDice())
  }

  const displayArray = die.map(ele => <Die value = {ele}/>)
  
  return (
    <main className='main-div'>
      <div className="die-div">
      {displayArray}
      </div>

      <button className="roll-btn" onClick={handleButtonClick}>
        <h1>Roll</h1>
      </button>

    </main>
  );
}

export default App;
