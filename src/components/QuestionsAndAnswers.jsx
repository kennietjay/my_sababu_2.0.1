import React, { useState } from "react";
import styles from "./QuestionsAndAnswers.module.css";

const QuestionAnswerComponent = ({ qaList }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.qaContainer}>
      <section className="section">
        <p className="intro">Frequently Asked Questions</p>
        {qaList.map((qa, index) => (
          <div
            key={index}
            className={styles.qaItem}
            onClick={() => handleClick(index)}
          >
            <div className={styles.qaQuestion}>
              <i
                className={`fa-solid ${
                  activeIndex === index ? "fa-chevron-down" : "fa-chevron-right"
                }`}
              ></i>
              {qa.question}
            </div>
            {activeIndex === index && (
              <div className={styles.qaAnswer}>{qa.answer}</div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default QuestionAnswerComponent;
