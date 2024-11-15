import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const questions = [
  {
    id: 1,
    questionText: "How satisfied are you with our products?",
    type: "rating",
    range: [1, 5],
  },
  {
    id: 2,
    questionText: "How fair are the prices compared to similar retailers?",
    type: "rating",
    range: [1, 5],
  },
  {
    id: 3,
    questionText:
      "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    range: [1, 5],
  },
  {
    id: 4,
    questionText:
      "On a scale of 1-10, how would you recommend us to your friends and family?",
    type: "rating",
    range: [1, 10],
  },
  {
    id: 5,
    questionText: "What could we do to improve our service?",
    type: "text",
  },
];

const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const navigate=useNavigate()

  const handleAnswerChange = (questionId, answer) => {
    setResponses({
      ...responses,
      [questionId]: answer,
    });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const uniqures = {
      ...responses,

      sessionID: Date.now(),
    };
    setResponses(uniqures);

    const userConfirmed = window.confirm(
      "Are you sure you want to save your responses?"
    );

    if (userConfirmed) {
      try {
        await fetch("http://localhost:3001/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responses),
        });
        navigate('/thankpage')
        setCurrentQuestionIndex(0)
        setResponses({})

      } catch (error) {
        console.log("Error while saving responses");
      }
    } else {
      console.log("Submission canceled.");
    }
  };
  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const previousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h3 style={{ margin: "0", fontSize: "3rem" }}>Customer Survey</h3>
      <h2>
        Question {currentQuestionIndex + 1}/{questions.length}
      </h2>
      <p style={{ fontSize: "2rem" }}>{currentQuestion.questionText}</p>

      {currentQuestion.type === "rating" && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {new Array(currentQuestion.range[1] - currentQuestion.range[0] + 1)
            .fill(0)
            .map((_, i) => {
              const ratingValue = currentQuestion.range[0] + i;
              return (
                <label
                  key={ratingValue}
                  style={{ display: "flex", placeItems: "center" }}
                >
                  <input
                    style={{ width: "20px", height: "20px", margin: "10px" }}
                    type="radio"
                    value={ratingValue}
                    checked={responses[currentQuestion.id] === ratingValue}
                    onChange={() =>
                      handleAnswerChange(currentQuestion.id, ratingValue)
                    }
                  />
                  {ratingValue}
                </label>
              );
            })}
        </div>
      )}

      {currentQuestion.type === "text" && (
        <textarea
          style={{ width: "400px", height: "60px" }}
          value={responses[currentQuestion.id] || ""}
          onChange={(e) =>
            handleAnswerChange(currentQuestion.id, e.target.value)
          }
        />
      )}

      <div>
        <button
          style={{
            width: "80px",
            height: "30px",
            borderRadius: "5px",
          }}
          onClick={previousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            style={{
              width: "80px",
              height: "30px",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
            onClick={handleClick}
          >
            submit
          </button>
        ) : (
          <button
            style={{
              width: "80px",
              height: "30px",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
            onClick={nextQuestion}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Survey;
