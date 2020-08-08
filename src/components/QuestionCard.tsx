import React, { useState } from 'react'
import {questionPropsType}  from './../Types/quiz_types';

const QuestionCard: React.FC<questionPropsType> = ({question, option, callback}) => {
    // console.log(question, option)

    let [selectedAns, setselectedAns] = useState("");

    const handleSeelction = (ev: any) => {
        // console.log(ev.target.value);
        setselectedAns(ev.target.value);
    }

    return (
        <div className="question-container">
            <div className="question">
                {question}
            </div>

            <form onSubmit={(e:React.FormEvent<EventTarget>)=> callback(e, selectedAns)}
            className="question-form"
            >
                {
                    option.map((opt: string, ind: number)=>{
                        return(
                            <div key={ind}>
                                <label>
                                <input 
                                type="radio"
                                required
                                name="opt"
                                value={opt}
                                checked={selectedAns === opt}
                                onChange={handleSeelction}
                              
                                />
                                {opt }
                            </label>
                            </div>
                        
                        )
                    })
                }
                <input type="submit" className="submit" />
            </form>
        </div>
    )
}

export default QuestionCard
