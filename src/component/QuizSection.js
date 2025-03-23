import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCheckCircle, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import quizData from './quizzes.json'; // Import quiz data

const QuizSection = ({ isDarkMode }) => {
  const { courseId } = useParams(); // Extract courseId from route parameters
  const [quiz, setQuiz] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null); // Add error state

  // Theme-based styles
  const themeStyles = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    textColor: isDarkMode ? '#fff' : '#000',
    cardBackground: isDarkMode ? '#2c2c2c' : '#fff',
    cardTextColor: isDarkMode ? '#fff' : '#000',
    progressBarColor: '#3CA9D1',
    progressBarBackground: isDarkMode ? '#444' : '#ddd',
  };

  // Fetch quiz data based on courseId
  useEffect(() => {
    console.log('Course ID:', courseId); // Debugging
    const selectedQuiz = quizData.find((quiz) => quiz.course_id === courseId); // Find quiz by course_id
    if (selectedQuiz) {
      console.log('Selected Quiz:', selectedQuiz); // Debugging
      setQuiz({
        quizId: selectedQuiz.quiz_id,
        title: selectedQuiz.title,
        difficulty: selectedQuiz.difficulty,
        questions: selectedQuiz.questions,
        time_required_minutes: selectedQuiz.time_required_minutes,
      });

      const formattedQuestions = selectedQuiz.question_list.map((q, index) => ({
        id: q.question_id,
        question: q.text,
        options: q.options,
        correctAnswer: q.correct_answer,
        explanation: `Correct answer: ${q.explanation}`,
      }));

      console.log('Formatted Questions:', formattedQuestions); // Debugging
      setQuizQuestions(formattedQuestions);
      setTimeLeft(selectedQuiz.time_required_minutes * 60);
      setError(null); // Clear any previous error
    } else {
      setError('No quiz found for this course. Please check the course ID.'); // Set error message
    }
  }, [courseId]); // Use courseId as dependency

  // Timer logic (optional)
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isSubmitted]);

  // Handle answer selection
  const handleAnswerSelect = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  // Handle quiz submission
  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log('User Answers:', userAnswers);
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Calculate correct and wrong answers
  const correctAnswers = quizQuestions.reduce((count, q) => {
    return userAnswers[q.id] === q.correctAnswer ? count + 1 : count;
  }, 0);
  const wrongAnswers = Object.keys(userAnswers).length - correctAnswers;

  // Render the current question
  const renderCurrentQuestion = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
      <div className="mb-4">
        <h5 style={{ color: themeStyles.textColor }}>{currentQuestion.question}</h5>
        <div className="d-flex flex-column gap-2">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`btn ${
                isSubmitted
                  ? option === currentQuestion.correctAnswer
                    ? 'btn-success'
                    : userAnswers[currentQuestion.id] === option
                    ? 'btn-danger'
                    : 'btn-outline-secondary'
                  : userAnswers[currentQuestion.id] === option
                  ? 'btn-primary'
                  : 'btn-outline-secondary'
              }`}
              onClick={() => handleAnswerSelect(currentQuestion.id, option)}
              disabled={isSubmitted}
            >
              {option}
            </button>
          ))}
        </div>
        {isSubmitted && (
          <div className="mt-2">
            <p className="text-muted">
              <strong>Correct Answer:</strong> {currentQuestion.correctAnswer}
            </p>
            <p className="text-muted">
              <strong>Explanation:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Render quiz details
  if (error) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!quiz) {
    return <p>Loading quiz...</p>;
  }

  return (
    <div
      className="vh-100 d-flex"
      style={{ backgroundColor: themeStyles.backgroundColor, color: themeStyles.textColor }}
    >
      {/* Left Slider with Progress Box */}
      <div
        className="sidebar p-3"
        style={{
          width: '250px',
          borderRight: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
          backgroundColor: themeStyles.cardBackground,
        }}
      >
        <h3 className="mb-4">Quiz Progress</h3>
        <hr />
        <div className="mb-4">
          <h5>Questions:</h5>
          <div className="d-flex flex-wrap gap-2">
            {quizQuestions.map((q, index) => (
              <div
                key={q.id}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: userAnswers[q.id] ? '#28a745' : '#dc3545', // Green if attempted, red if not
                  borderRadius: '4px',
                  border: currentQuestionIndex === index ? '2px solid #3CA9D1' : 'none', // Highlight current question
                }}
              />
            ))}
          </div>
        </div>
        {isSubmitted && (
          <div className="text-center">
            <h4>Results</h4>
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: `conic-gradient(
                  green 0% ${(correctAnswers / quizQuestions.length) * 100}%,
                  red ${(correctAnswers / quizQuestions.length) * 100}% 100%
                )`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: themeStyles.cardBackground,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: themeStyles.textColor }}>
                  {correctAnswers}/{quizQuestions.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content (Right Side) */}
      <div className="flex-grow-1 p-4 overflow-auto">
        {/* Quiz Header */}
        <div className="mb-4 p-3" style={{ borderRadius: '10px', backgroundColor: themeStyles.cardBackground }}>
          <h2 style={{ color: themeStyles.textColor }}>{quiz.title}</h2>
          <p style={{ color: themeStyles.textColor }}>
            Difficulty: {quiz.difficulty} | Questions: {quiz.questions} | Time Required:{' '}
            {quiz.time_required_minutes} minutes
          </p>
        </div>

        {/* Timer (optional) */}
        <div className="mb-4 p-3" style={{ borderRadius: '10px', backgroundColor: themeStyles.cardBackground }}>
          <FontAwesomeIcon icon={faClock} className="me-2" style={{ color: themeStyles.textColor }} />
          <span style={{ color: themeStyles.textColor }}>
            Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </span>
        </div>

        {/* Current Question */}
        <div className="mb-4 p-3" style={{ borderRadius: '10px', backgroundColor: themeStyles.cardBackground }}>
          {renderCurrentQuestion()}
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-secondary"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Previous
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === quizQuestions.length - 1}
          >
            Next
            <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </button>
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={timeLeft === 0}
            >
              Submit Quiz
            </button>
          </div>
        )}

        {/* Submission Message */}
        {isSubmitted && (
          <div className="alert alert-success mt-4">
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Quiz submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;