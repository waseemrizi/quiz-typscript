import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails } from './services/quiz_services';
import { QuestionType } from './Types/quiz_types';
import QuestionCard from './components/QuestionCard';

function App() {

  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false)


  useEffect(() => {

    async function fetchData() {
      const questions: QuestionType[] = await getQuizDetails(5, 'easy');
      console.log(questions);

      setQuiz(questions)
    }
    fetchData();
  }, []);


  const handleSubmit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();
    // console.log(userAns);

    const currentQustion: QuestionType = quiz[currentStep];

    //console.log(currentQustion.correct_answer, userAns);

    if (userAns === currentQustion.correct_answer) {
      setScore(++score);
    }


    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep);

    else {
      setShowResult(true);
    }
  }

  if (!quiz.length)

    return <h2>Loading.. . </h2>
    if(showResult){
      return (<div className="question-container result-container">
        <h2>Result</h2>
  
        <p className="result-text">
          You final score is 
            <b> {score}</b> out of <b>{quiz.length}</b>
        </p>
      </div>)
    }
  return (
    <div className="App">
       <h1>Quiz App</h1>
       
      <QuestionCard
        option={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}
      />

    </div>
  );
}

export default App;
