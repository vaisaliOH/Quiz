import React, { useState, useRef } from "react"; 
import { data } from "./assets/data";

function Quiz() {
    const [index, setIndex] = useState(0); 
    const [lock, setLock] = useState(false); 
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false); // New state for completion

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);
    const option_array = [Option1, Option2, Option3, Option4];

    const question = index < data.length ? data[index] : null;

    const checkAns = (e, ans) => {
        if (!lock && question) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore((s) => s + 1);
            } else {
                e.target.classList.add("incorrect");
                option_array[question.ans - 1].current.classList.add("correct");
            }
            setLock(true);
        }
    };

    const handleNext = () => {
        if (lock) {
            if (index < data.length - 1) {
                setIndex((prevIndex) => prevIndex + 1);
                setLock(false);
                option_array.forEach((option) => {
                    if (option.current) {
                        option.current.classList.remove("incorrect");
                        option.current.classList.remove("correct");
                    }
                });
            } else {
                setCompleted(true); // Mark quiz as completed
            }
        }
    };

    const reset = () => {
        setIndex(0); // Reset index to the first question
        setLock(false); // Unlock the options
        setScore(0); // Reset the score
        setCompleted(false); // Mark the quiz as not completed
        option_array.forEach((option) => {
            if (option.current) {
                option.current.classList.remove("incorrect");
                option.current.classList.remove("correct");
            }
        });
    };

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {!completed ? (
                <>
                    <h2>
                        {index + 1}. {question?.question}
                    </h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question?.option1}</li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question?.option2}</li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question?.option3}</li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question?.option4}</li>
                    </ul>
                    <button className="button-container" onClick={handleNext}>
                        NEXT
                    </button>
                    <div className="index">
                        {index + 1} out of {data.length} questions
                    </div>
                </>
            ) : (
                <div className="score-container">
                    <p>Your score is <strong>{score}</strong> out of <strong>{data.length}</strong>.</p>
                    <div className="button-container">
                    <button className="reset" onClick={reset}>
                        Restart Quiz
                    </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;
