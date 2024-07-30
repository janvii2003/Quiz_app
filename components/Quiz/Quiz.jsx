import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../src/assets/data'

const Quiz = () => {
    const [index, setIndex]=useState(0)
    const [question, setQuestion]=useState(data[index])
    const [lockAns, setLockAns]=useState(false)
    const [score, setScore]=useState(0)
    const [result, setResult]=useState(false)

    const option1=useRef(null)
    const option2=useRef(null)
    const option3=useRef(null)
    const option4=useRef(null)
    const optionsArray=[option1,option2,option3,option4]

    const checkAnswer=(e, selectedAnswer)=>{
        if(lockAns===false)
        {
            if(selectedAnswer===question.ans){
                e.target.classList.add("correct")
                setLockAns(true)
                setScore(score+1)
            }
            else{
                e.target.classList.add("wrong")
                setLockAns(true)
                optionsArray[question.ans-1].current.classList.add("correct")
            }
         }
       }

       const nextButton=()=>{
        if(lockAns===true)
        {
            if(index===data.length-1)
                {
                    setResult(true)
                    return 0
                }
            console.log("next clicked")
            setIndex(index+1)
            setQuestion(data[index+1])
            setLockAns(false)
            optionsArray.map((option)=>{
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
                return null
            })
        }
        }

        const resetButton=()=>{
            setIndex(0)
            setQuestion(data[0])
            setLockAns(false)
            setScore(0)
            setResult(false)
        }

  return (
    <div className='container'>
        <h1>QUIZZ GAME</h1>
        <hr/>
        {result? <>
        <h2 className='score'>You scored {score} out of {data.length}</h2>
        <button onClick={resetButton}>Reset</button> </> : <>
            <h2>{index+1}. {question.question}</h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAnswer(e,1)}}> {question.option1} </li>
            <li ref={option2} onClick={(e)=>{checkAnswer(e,2)}}> {question.option2} </li>
            <li ref={option3} onClick={(e)=>{checkAnswer(e,3)}}> {question.option3} </li>
            <li ref={option4} onClick={(e)=>{checkAnswer(e,4)}}> {question.option4} </li>
        </ul>
        <button onClick={nextButton}>Next</button>
        <div className="index">{index+1} of {data.length} questions</div> </>}
        
    </div>
  )
}

export default Quiz
