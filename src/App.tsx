import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails } from './services/quiz_services';
import { QuestionType, Quiz } from './Types/quiz_types';
import QuestionCard from './components/QuestionCard';

function App() {

  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [score, setScore] = useState(0);

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
      alert("Your score is: " + score + " Out of:  " + quiz.length);
      setCurrentStep(0);
      setScore(0);
    }
  }

  if (!quiz.length)

    return <h2>Loading.. . </h2>
  return (
    <div className="App">
      <QuestionCard
        option={quiz[currentStep].option}
        question={quiz[currentStep].question}
        callback={handleSubmit}
      />

    </div>
  );
}

export default App;
