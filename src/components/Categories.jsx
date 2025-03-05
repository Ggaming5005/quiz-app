import { useQuiz } from "../context/QuizContext";
import { useTheme } from "../context/ThemeContext";

function Categories() {
  const { dispatch, categories } = useQuiz();
  const { isDarkMode } = useTheme(); 

  return (
    <form className="categories">
      {categories.map((category) => (
        <button
          className={`category heading-s ${
            isDarkMode ? "category-dark-theme" : ""
          }`}
          key={category.title}
          onClick={() => dispatch({ type: "start", payload: category.title })}
        >
          <img
            src={category.icon.slice(1)}
            alt={`${category.title} icon`}
            className={`category-img ${category.title.toLowerCase()}`}
          />
          <span>{category.title}</span>
        </button>
      ))}
    </form>
  );
}

export default Categories;
