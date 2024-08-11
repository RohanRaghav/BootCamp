import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionPaper = () => {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [username, setUsername] = useState('');
    const [UID, setUID] = useState('');
    const [course, setCourse] = useState('');
    const [ Department, setDepartment] = useState('');
    const [ Year, setYear] = useState('');
    const [answers, setAnswers] = useState([]);
    const [startTime, setStartTime] = useState(new Date());
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [submittedInfo, setSubmittedInfo] = useState(false);
    const questionsPerPage = 1;
    const navigate = useNavigate();
    const handleFeedbackSubmition = () => {
        navigate('/Thanks');
    };
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://boot-camp-server-chi.vercel.app/api/questions');
                setQuestions(response.data);
                setAnswers(response.data.map(() => ''));
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
        const timeTaken = (endTime - startTime) / 1000;
        const allAnswers = answers.map((answer, index) => ({
            questionTitle: questions[index].title,
            answer,
            timeTaken,
        }));

        const data = { username, UID, course, Department, Year, answers: allAnswers };

        console.log('Submitting data:', JSON.stringify(data, null, 2)); // Log the data being sent

        try {
            await axios.post('https://boot-camp-server-chi.vercel.app/submit-test', data);
                setShowFeedback(true);

        } catch (error) {
            console.error('Error submitting test:', error);
        }
    };

    const handleFeedbackSubmit = async () => {
        try {
            await axios.post('https://boot-camp-server-chi.vercel.app/submit-feedback', { username, UID, course, feedback, rating, Department, Year });
            setShowFeedback(false);
            setFeedback('');
            setRating(0);
            handleFeedbackSubmition();
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
                            <form onSubmit={handleInfoSubmit}>
                                <label className='info'>
                                    Username:
                                    <input
                                        type="text"
                                        placeholder='Name'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className='input'
                                        required
                                    />
                                </label>
                                <br />
                                <label className='info'>
                                    UID:
                                    <input
                                        type="text"
                                        placeholder='UID'
                                        className='input'
                                        value={UID}
                                        onChange={(e) => setUID(e.target.value)}
                                        required
                                    />
                                </label>
                                <br />
                                <label className='info'>
                                    Course:
                                    <select value={course} className='input' onChange={(e) => setCourse(e.target.value)} required>
                                        <option value="">Select your course</option>
                                        <option value="course1">Frontend</option>
                                          <option value="course2">Backend</option>
                                          <option value="course3">UI/UX</option>
                                          <option value="course4">Trading</option>
                                          <option value="course5">DSA</option>
                                    </select>
                                </label>
                                <br />
                                <label className='info'>
                                    Department:
                                    <select value={Department} className='input' onChange={(e) => setDepartment(e.target.value)} required>
                                        <option value="">Select your Department</option>
                                        <option value="department1">AU-1</option>
              <option value="department2">AU-2</option>
              <option value="department3">AU-3</option>
              <option value="department4">AU-4</option>
              <option value="department5">AU-5</option>
              <option value="department6">Aerospace Engg.</option>
              <option value="department7">CSE-AIT</option>
              <option value="department8">Automobile Engg.</option>
              <option value="department9">Biotech Engineering</option>
              <option value="department10">Chemical Engg.</option>
              <option value="department11">Civil Engg.</option>
              <option value="department12">CSE 2nd year</option>
              <option value="department13">CSE 3rd year</option>
              <option value="department14">CSE 4th year</option>
              <option value="department15">ECE</option>
              <option value="department16">EE</option>
              <option value="department17">Mechanical Engg.</option>
              <option value="department18">Mechatronics</option>
              <option value="department19">Petroleum</option>
              <option value="department20">UIC</option>
              <option value="department21">UILA</option>
              <option value="department22">UILA(English)</option>
              <option value="department23">UIFVA-Film Studies</option>
              <option value="department24">UID-Fashion Design</option>
              <option value="department25">UID-Fine Arts</option>
              <option value="department26">UID-Industrial Design</option>
              <option value="department27">UID-Interior Design</option>
              <option value="department28">UIMS- Media Studies</option>
              <option value="department29">UIA-Architecture</option>
              <option value="department30">UITTR</option>
              <option value="department31">UIFVA-Animation</option>
              <option value="department32">USB-BBA</option>
              <option value="department33">USB-Commerce</option>
              <option value="department34">MBA-AIT</option>
              <option value="department35">USB-MBA</option>
              <option value="department36">UITHM-1st year HHM and culinary sciences</option>
              <option value="department37">UITHM- RCM&REM</option>
              <option value="department38">UITHM-TTM,MBA-THM, Ph.D</option>
              <option value="department39">UITHM-AAM</option>
              <option value="department40">LLB Program and LLM Program B.Com BA. LLB .</option>
              <option value="department41">LLB Program</option>
              <option value="department42">UIAHS-Nutrition & Optometry</option>
              <option value="department43">UIAHS-MLT</option>
              <option value="department44">UIAHS- FORENSIC SCIENCE</option>
              <option value="department45">UIAHS-Physiotherapy</option>
              <option value="department46">UIPS-Pharmacy</option>
              <option value="department47">UIN-Nursing</option>
              <option value="department48">UIAS</option>
              <option value="department49">UIBT</option>
              <option value="department50">UIS-Chemistry</option>
              <option value="department51">UIS- Math</option>
              <option value="department52">UIS-Physics</option>
              <option value="department53">Biosciences</option>
                                    </select>
                                </label>
                                <br />
                                <label className='info'>
                                    Year:
                                    <select value={Year} className='input' onChange={(e) => setYear(e.target.value)} required>
                                        <option value="">Select your Year</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </label>
                                <br />
                                <div style={{alignItems:'center'}}>
                                    <button type="submit" className='infobtn'>Submit</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            {currentQuestion ? (
                                <div className='questionbox'>
                                    <h2 className='questionTitle'>{currentQuestion.title}</h2>
                                    <p className='question'>{currentQuestion.description}</p>
                                    <textarea
                                        value={answers[currentPage]}
                                        onChange={handleAnswerChange}
                                        placeholder="Write your answer here..."
                                        rows="4"
                                        cols="50"
                                        className='texts'
                                    />
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
                                        {currentPage < questions.length - 1 ? (
                                            <div className='PositioningNext'>
                                                <button className="button-3d" onClick={handleNext}>
                                                    <div className="button-top">
                                                        <span className="material-icons">❯</span>
                                                    </div>
                                                    <div className="button-bottom"></div>
                                                    <div className="button-base"></div>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className='PositioningNext'>
                                                <button className="button-3d" onClick={handleSubmit}>
                                                    <div className="button-top">
                                                        <span className="material-icons">❯</span>
                                                    </div>
                                                    <div className="button-bottom"></div>
                                                    <div className="button-base"></div>
                                                </button>
                                            </div>
                                        )}
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
                    <h2>Feedback</h2>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write your feedback here..."
                        style={{color:'black'}}
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
