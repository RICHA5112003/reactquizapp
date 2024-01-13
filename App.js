import React, { useState, useEffect } from 'react';

const MathQuizApp = () => {
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [quizHistory, setQuizHistory] = useState([]);

  const mathQuestions = [
    {
      question: 'What is the value of 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    {
      question: 'Solve for x: 3x - 8 = 13',
      options: ['3', '5', '7', '6'],
      correctAnswer: '7',
    },
    {
      question: 'What is the square root of 25?',
      options: ['3', '5', '6', '25'],
      correctAnswer: '5',
    },
    {
      question: 'If a rectangle has a length of 8 units and a width of 3 units, what is its area?',
      options: ['24', '15', '10', '30'],
      correctAnswer: '24',
    },
    {
      question: 'What is the result of 3 * (4 + 2)?',
      options: ['15', '18', '20', '24'],
      correctAnswer: '18',
    },
  ];

  useEffect(() => {
    // Save quiz history to local storage
    localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
  }, [quizHistory]);

  const handleStartQuiz = () => {
    if (currentQuestion === 0) {
      alert(`Welcome, ${userName}! Let's start the quiz.`);
    }

    if (currentQuestion < mathQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      const newQuizResult = {
        userName,
        score: score + (selectedAnswer === mathQuestions[currentQuestion].correctAnswer ? 1 : 0),
        timestamp: new Date().toLocaleString(),
      };

      setQuizHistory([...quizHistory, newQuizResult]);
      alert(`Quiz completed! Your score: ${newQuizResult.score}/${mathQuestions.length}`);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer('');
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === mathQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < mathQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      const newQuizResult = {
        userName,
        score: score + (selectedAnswer === mathQuestions[currentQuestion].correctAnswer ? 1 : 0),
        timestamp: new Date().toLocaleString(),
      };

      setQuizHistory([...quizHistory, newQuizResult]);
      alert(`Quiz completed! Your score: ${newQuizResult.score}/${mathQuestions.length}`);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer('');
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
  };

  const handleViewHistory = () => {
    alert(JSON.stringify(quizHistory, null, 2));
  };

  return (
    <div style={{
      backgroundColor: '#ADD8E6',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#8B008B',  // Dark Pink
      fontSize: '25px',  // Set font size to 25
    }}>
      {userName === '' ? (
        <div>
          <h1>Enter something to continue</h1>
          <form>
            <label>
              Name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
          </form>
          <button style={{ fontSize: '20px', margin: '10px' }} onClick={() => handleStartQuiz()}>
            Start Quiz
          </button>
        </div>
      ) : (
        <div>
          {currentQuestion < mathQuestions.length && (
            <div>
              <h2>{mathQuestions[currentQuestion].question}</h2>
              <form>
                {mathQuestions[currentQuestion].options.map((option, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        id={`option${index}`}
                        name="answer"
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={() => setSelectedAnswer(option)}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </form>
              <button style={{ fontSize: '20px', margin: '10px' }} onClick={handleAnswerSubmit}>
                Next
              </button>
              <button style={{ fontSize: '20px', margin: '10px' }} onClick={handleReset}>
                Reset
              </button>
              <button style={{ fontSize: '20px', margin: '10px' }} onClick={handleViewHistory}>
                View History
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MathQuizApp;
