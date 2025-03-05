import { useQuiz } from "../context/QuizContext";
import { useTheme } from "../context/ThemeContext";
import LargeButton from "./LargeButton";
import SelectedCategory from "./SelectedCategory";

function Score() {
  const { score, numQuestions, dispatch } = useQuiz();
  const { isDarkMode } = useTheme();

  function handleReset(e) {
    e.preventDefault();

    dispatch({ type: "reset" });
  }

  return (
    <div className="score">
      <div
        className={`score-card ${isDarkMode ? "score-card-dark-theme" : ""}`}
      >
        <SelectedCategory />
        <div className="score-text">
          <p className="display">{score}</p>
          <p className="body-m">out of {numQuestions}</p>
        </div>
      </div>
      <LargeButton type="button" handleReset={handleReset}>
        Play Again
      </LargeButton>
    </div>
  );
}

export default Score;
