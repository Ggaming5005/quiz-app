import { useQuiz } from "../context/QuizContext";

function SelectedCategory() {
  const { categories, category } = useQuiz();

  const displayedCategory = categories.filter(
    (displayedCategory) => displayedCategory.title === category
  )[0]?.icon;

  return (
    <div className="selected-category">
      {category && (
        <>
          <img
            src={displayedCategory.slice(1)}
            alt={displayedCategory}
            className={`category-img ${category.toLowerCase()}`}
          />
          <span className="heading-s">{category}</span>
        </>
      )}
    </div>
  );
}

export default SelectedCategory;
