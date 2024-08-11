import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionPaper = () => {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const username = sessionStorage.getItem('username');
    const UID = sessionStorage.getItem('UID');
    const Year = sessionStorage.getItem('Year');
    const Department = sessionStorage.getItem('Department');
    const course = sessionStorage.getItem('course');
    const [answers, setAnswers] = useState([]);
    const [timeTakenPerQuestion, setTimeTakenPerQuestion] = useState([]);
    const [startTime, setStartTime] = useState(new Date());
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [submittedInfo, setSubmittedInfo] = useState(false);
    const [totalMarks, setTotalMarks] = useState(0);
    const questionsPerPage = 1;
    const navigate = useNavigate();

    const handleFeedbackSubmission = () => {
        navigate('/Thanks');
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://boot-camp-server-r1kd.vercel.app/api/questions');
                setQuestions(response.data);
                setAnswers(response.data.map(() => ''));
                setTimeTakenPerQuestion(response.data.map(() => 0));
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        setStartTime(new Date());
    }, [currentPage]);

    const handleNext = () => {
        if ((currentPage + 1) * questionsPerPage < questions.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAnswerChange = (e) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentPage] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async () => {
        const endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // time taken in seconds
        const currentAnswer = answers[currentPage];
        const correctAnswer = questions[currentPage].correctAnswer;

        let updatedMarks = totalMarks;
        if (currentAnswer === correctAnswer) {
            updatedMarks += 1;
        }
        setTotalMarks(updatedMarks);

        const updatedTimeTaken = [...timeTakenPerQuestion];
        updatedTimeTaken[currentPage] = timeTaken;
        setTimeTakenPerQuestion(updatedTimeTaken);

        if (currentPage === questions.length - 1) {
            const data = {
                username,
                UID,
                course,
                Department,
                Year,
                answers: answers.map((answer, index) => ({
                    answer,
                    marks: answer === questions[index].correctAnswer ? 1 : 0,
                    timeTaken: timeTakenPerQuestion[index]
                })),
                totalMarks: updatedMarks,
            };

            try {
                await axios.post('https://boot-camp-server-r1kd.vercel.app/submit-test', data);
                setShowFeedback(true);
            } catch (error) {
                console.error('Error submitting test:', error);
            }
        } else {
            setStartTime(new Date()); // Reset start time for next question
            handleNext();
        }
    };

    const handleFeedbackSubmit = async () => {
        try {
            await axios.post('https://boot-camp-server-r1kd.vercel.app/submit-feedback', {
                username,
                UID,
                course,
                feedback,
                rating,
                Department,
                Year,
            });
            setShowFeedback(false);
            setFeedback('');
            setRating(0);
            handleFeedbackSubmission();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        setSubmittedInfo(true);
    };

    const startIndex = currentPage * questionsPerPage;
    const currentQuestion = questions[startIndex];

    return (
        <div className="questionpaper">
            {!showFeedback ? (
                <div>
                    {!submittedInfo ? (
                        <div className='formhandle'>
                            <h1>Hey {username}, please start your course exam whenever you are ready.</h1>
                            <form onSubmit={handleInfoSubmit}>
                                <div style={{ alignItems: 'center' }}>
                                    <button type="submit" className='infobtn'>Start</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            {currentQuestion ? (
                                <div className='questionbox'>
                                    <h2 className='questionTitle'>{currentQuestion.title}</h2>
                                    <p className='question'>{currentQuestion.description}</p>
                                    <div className='options'>
                                        {[1, 2, 3, 4].map((option) => (
                                            <label key={option}>
                                                <input
                                                    type="radio"
                                                    name={`question-${currentPage}`}
                                                    value={option}
                                                    checked={answers[currentPage] === option.toString()}
                                                    onChange={handleAnswerChange}
                                                />
                                                {currentQuestion[`option${option}`]}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="button-container">
                                        <div className='PositioningPrevious'>
                                            <button className="button-3d" onClick={handlePrevious} disabled={currentPage === 0}>
                                                <div className="button-top">
                                                    <span className="material-icons">❮</span>
                                                </div>
                                                <div className="button-bottom"></div>
                                                <div className="button-base"></div>
                                            </button>
                                        </div>
                                        <div className='PositioningNext'>
                                            <button className="button-3d" onClick={handleSubmit}>
                                                <div className="button-top">
                                                    <span className="material-icons">❯</span>
                                                </div>
                                                <div className="button-bottom"></div>
                                                <div className="button-base"></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading questions...</p>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className='feedback'>
                    <h2>Total Marks: {totalMarks}</h2>
                    <h2>Feedback</h2>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write your feedback here..."
                        style={{ color: 'black' }}
                        rows="4"
                        cols="50"
                    />
                    <br />
                    <div className="rating">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <React.Fragment key={star}>
                                <input
                                    value={star}
                                    name="rating"
                                    id={`star${star}`}
                                    type="radio"
                                    checked={rating === star}
                                    onChange={() => setRating(star)}
                                />
                                <label htmlFor={`star${star}`}></label>
                            </React.Fragment>
                        ))}
                    </div>
                    <br />
                    <button onClick={handleFeedbackSubmit} className='feedbackbutton'>Submit Feedback</button>
                </div>
            )}
        </div>
    );
};

export default QuestionPaper;
