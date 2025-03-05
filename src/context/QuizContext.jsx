import data from "../../data.json";
import { createContext, useContext, useReducer } from "react";

const quizzes = data.quizzes;

const categories = quizzes.map((quiz) => ({
  title: quiz.title,
  icon: quiz.icon,
}));

const QuizContext = createContext();

const initialState = {
  category: null,
  questions: [],
  status: "ready",
  index: 0,
  answer: null,
  isAnswered: false,
  isCorrect: false,
  score: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "active",
        category: action.payload,
        questions: quizzes.filter((quiz) => quiz.title === action.payload)[0]
          .questions,
      };

    case "selectAnswer":
      return {
        ...state,
        isAnswered: false,
        isCorrect: false,
        answer: action.payload,
      };

    case "submitAnswer":
      return {
        ...state,
        isAnswered: true,
        isCorrect: state.answer === state.questions[state.index].answer,
        score:
          state.answer === state.questions[state.index].answer
            ? state.score + 1
            : state.score,
      };

    case "nextQuestion":
      return {
        ...state,
        isCorrect: false,
        isAnswered: false,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "completed",
      };

    case "reset":
      return {
        ...initialState,
      };

    default:
      throw new Error("unknown action");
  }
}

function QuizProvider({ children }) {
  const [
    {
      category,
      questions,
      status,
      index,
      answer,
      isAnswered,
      isCorrect,
      score,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  return (
    <QuizContext.Provider
      value={{
        categories,
        category,
        questions,
        numQuestions,
        score,
        status,
        index,
        answer,
        isAnswered,
        isCorrect,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Context was used outside the Quiz Provider");

  return context;
}

export { QuizProvider, useQuiz };
