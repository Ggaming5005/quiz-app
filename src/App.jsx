import Main from "./components/Main";
import Title from "./components/Title";
import Score from "./components/Score";
import Header from "./components/Header";
import Answers from "./components/Answers";
import Question from "./components/Question";
import Completed from "./components/Completed";
import Categories from "./components/Categories";
import ToggleButton from "./components/ToggleButton";
import SelectedCategory from "./components/SelectedCategory";

import { useQuiz } from "./context/QuizContext";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { status } = useQuiz();
  const { isDarkMode } = useTheme();

  return (
    <>
      <div className={`app ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        <div className="container-wrapper">
          <div className="container">
            <div className="content">
              <Header>
                <SelectedCategory />
                <ToggleButton />
              </Header>
              <Main>
                {status === "ready" && (
                  <>
                    <Title />
                    <Categories />
                  </>
                )}
                {status === "active" && (
                  <>
                    <Question />
                    <Answers />
                  </>
                )}
                {status === "completed" && (
                  <>
                    <Completed />
                    <Score />
                  </>
                )}
              </Main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
