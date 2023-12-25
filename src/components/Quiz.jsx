import { useState, useCallback } from "react";
import QUESTIONS from '../questions'
import QuizCompleteImg from '../assets/quiz-complete.png'
import Timer from "./Timer";


const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const quizCompleted = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback((answer) => {

        setAnswerState('answered')
        setUserAnswers(prevAns => {
            return [...prevAns, answer]
        });

        setTimeout(() => {
            if (answer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }

            setTimeout(() => {
                setAnswerState('')
            }, 2000);
        }, 1000);
    },
        [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (quizCompleted) {
        return <div id="summary">
            <img src={QuizCompleteImg} alt="complete" />
            <h2>Quiz Completed</h2>
        </div>
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5);


    return (
        <div id="quiz">
            <div id="question">
                <Timer
                    key={activeQuestionIndex} // to rerender the component
                    timeout={10000}
                    onTimeout={handleSkipAnswer}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id='answers'>
                    {shuffledAnswers.map((answer, index) => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
                        let cssClasses = ' ';
                        if (answerState === 'answered' && isSelected) {
                            cssClasses = 'selected'
                        }
                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClasses = answerState;
                        }

                        return (
                            <li key={index} className="answer">
                                <button onClick={() => handleSelectAnswer(answer)}>{answer} className={cssClasses}</button>
                            </li>
                        )
                    }
                    )}
                </ul>
            </div>
        </div>

    );
}

export default Quiz;