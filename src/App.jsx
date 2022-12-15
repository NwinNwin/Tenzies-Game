import React, {useState, useEffect} from "react";
import './App.css';
import Die from './components/Die';
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const numArray = [0,0,0,0,0
                    ,0,0,0,0,0];
  
  const [die, setDie] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  function allNewDice(){
    return numArray.map(ele => {
      return { value : Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
    }
    })
  }


  function holdDice(id){
    setDie(prev => prev.map(ele => {
      return (id === ele.id ? {...ele, isHeld : !ele.isHeld} : ele)
      }))
  }
  function handleButtonClick(){
    setDie(prev => prev.map(ele => {
      return ele.isHeld ? ele : {...ele, value: Math.floor(Math.random() * 6) + 1}
    }))
  }

  const displayArray = die.map(ele => <Die key = {ele.id} value = {ele.value} isHeld = {ele.isHeld} holdDice = {holdDice} id = {ele.id}/>)

  function restart(){
    setDie(allNewDice());
    setTenzies(false);
  }

  useEffect(() => {
    let win = 0;
    let winningNum = 0;
    die.forEach(ele => {
      if (ele.isHeld && winningNum === 0){
        winningNum = ele.value;
        win ++;
      }
      else if (ele.isHeld && winningNum === ele.value){
        win ++;
      }
    })

    if (win === 10) {
      setTenzies(true)
      let winTimes;
      !localStorage.getItem("win") ? winTimes = 1 : winTimes = localStorage.getItem("win");
      localStorage.setItem('win', ++winTimes);
    }
  }, [die])
  
  return (
    <main className='main-div'>
      {tenzies && <Confetti/>}
      <h1 className="title">{tenzies ? "💯YOU WIN!💯" : "🎲 Tenzies 🎲"}</h1>
      <p className="instructions">{tenzies ? "wanna play again?" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
      <div className="die-div">
      {displayArray}
      </div>

      {
      
      tenzies 
      ?
      <button className="roll-btn-win" onClick={restart}>
        <h1>Restart</h1>
      </button>

      :

      <button className="roll-btn" onClick={handleButtonClick}>
        <h1>Roll</h1>
      </button>}

      <div>Win Count : {localStorage.getItem("win")}</div>

    </main>
  );
}

export default App;
