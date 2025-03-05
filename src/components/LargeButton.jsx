function LargeButton({ children, type, handleNext, handleReset }) {
  if (type === "submit")
    return (
      <button className="large-button heading-s" type="submit">
        {children}
      </button>
    );

  if (type === "button" && handleReset) {
    return (
      <button
        className="large-button heading-s"
        type="button"
        onClick={handleReset}
      >
        {children}
      </button>
    );
  } else if (type === "button")
    return (
      <button
        className="large-button heading-s"
        type="button"
        onClick={handleNext}
      >
        {children}
      </button>
    );
}

export default LargeButton;
