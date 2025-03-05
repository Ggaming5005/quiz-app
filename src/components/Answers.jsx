import { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";
import LargeButton from "./LargeButton";
import { useTheme } from "../context/ThemeContext";

function Answers() {
  const [active, setActive] = useState();
  const { index, questions, answer, isAnswered, isCorrect, dispatch } =
    useQuiz();
  const { isDarkMode } = useTheme();

  const options = questions[index].options;
  const optionLetters = ["A", "B", "C", "D"];
  const nextButton = index < questions.length - 1 ? "Next question" : "Finish";

  useEffect(() => {
    setActive(null);
  }, [index]);

  useEffect(() => {
    if (isAnswered && isCorrect) {
      const audio = new Audio("/src/Sounds/duolingo-correct.mp3");
      audio.play();
    } else if (isAnswered && !isCorrect && answer) {
      const audio = new Audio("/src/Sounds/duolingo-wrong.mp3");
      audio.play();
    }
  }, [isAnswered, isCorrect, answer]);

  useEffect(() => {
    if (isAnswered && !answer) {
      const errorAudio = new Audio("/src/Sounds/error.mp3");
      errorAudio.play();
    }
  }, [isAnswered, answer]);
  function handleButtonClick() {
    const buttonAudio = new Audio("/src/Sounds/button-pressed.mp3");
    buttonAudio.play();
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "submitAnswer" });
  }
  
  function handleNext(e) {
    e.preventDefault();
    if (e.target.textContent === "Next question")
      dispatch({ type: "nextQuestion" });
    if (e.target.textContent === "Finish") dispatch({ type: "finish" });
  }


  return (
    <form className="answers" onSubmit={handleSubmit}>
      <div className="answers-sub">
        {options.map((option, index) => (
          <button
            type="button"
            className={`answer heading-s ${
              active === index ? "answer-active" : ""
            } ${
              isCorrect && option === answer    
                ? "answer-correct"
                : !isCorrect && option === answer && isAnswered
                ? "answer-incorrect"
                : ""
            } ${isDarkMode ? "category-dark-theme" : ""}`}
            key={option}
            onClick={() => {
              handleButtonClick();
              if (!isAnswered || (isAnswered && !answer)) {
                setActive(index);
                dispatch({ type: "selectAnswer", payload: option });
              }
            }}
          >
            <div
              className={`variant-rectangle ${
                active === index ? "rectangle-active" : ""
              } ${
                isCorrect && option === answer
                  ? "rectangle-correct"
                  : !isCorrect && option === answer && isAnswered
                  ? "rectangle-incorrect"
                  : ""
              }`}
            >
              {optionLetters[index]}
            </div>
            <span className="answer-text">{option}</span>

            {isCorrect && option === answer && (
              <img src="/icon-correct.svg" className="icon-correct" />
            )}
            {!isCorrect && isAnswered && option === answer && (
              <img src="/icon-incorrect.svg" className="icon-incorrect" />
            )}
          </button>
        ))}
      </div>
      {isAnswered && answer ? (
        <LargeButton type="button" handleNext={handleNext} onClick={handleButtonClick}>
          {nextButton}
        </LargeButton>
      ) : (
        <LargeButton type="submit" onClick={handleButtonClick}>Submit Answer</LargeButton>
      )}

      {isAnswered && !answer && (
        <div className="answer-error body-m">
          <img src="/icon-incorrect.svg" />
          <span className="answer-error-text">Please select an answer</span>
        </div>
      )}
    </form>
  );
}

export default Answers;