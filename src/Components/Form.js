import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Form = () => {
  const [username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [UID, setUID] = useState('');
  const [PhNumber, setPhNumber] = useState('');
  const [course, setCourse] = useState('');
  const [Department, setDepartment] = useState('');
  const [Year, setYear] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmition = () => {
    setUser({ username, UID, course, Department, Year, PhNumber, Email });
    navigate('/Choice');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, UID, course, Department, Year, PhNumber, Email };

    console.log('Submitting data:', JSON.stringify(data, null, 2));

    try {
      await axios.post('http://localhost:3001/submit-info', data);
      handleSubmition();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="forming">
      <div className='formhandle'>
        <h1>Assessment Bootcamp Registration</h1>
        <form onSubmit={handleSubmit}>
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
              className='input'
              placeholder='UID'
              value={UID}
              onChange={(e) => setUID(e.target.value)}
              required
            />
          </label>
          <br />
          <label className='info'>
            Course:
            <select value={course} className='input' style={{ color: 'grey' }} onChange={(e) => setCourse(e.target.value)} required>
              <option value="">Select your course</option>
              <option value="course1">Course 1</option>
              <option value="course2">Course 2</option>
              <option value="course3">Course 3</option>
            </select>
          </label>
          <br />
          <label className='info'>
            Email:
            <input
              type="text"
              placeholder='Example@gmail.com'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className='input'
              required
            />
          </label>
          <br />
          <label className='info'>
            Department:
            <select value={Department} className='input' style={{ color: 'grey' }} onChange={(e) => setDepartment(e.target.value)} required>
              <option value="">Select your Department</option>
              <option value="department1">Department 1</option>
              <option value="department2">Department 2</option>
              <option value="department3">Department 3</option>
            </select>
          </label>
          <br />
          <label className='info'>
            Year:
            <select value={Year} className='input' style={{ color: 'grey' }} onChange={(e) => setYear(e.target.value)} required>
              <option value="">Select your Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label>
          <br />
          <div className="ui-wrapper">
            <div className="input-wrapper">
              <legend>
                <label htmlFor="phonenumber">
                  Phonenumber*
                </label>
              </legend>
              <div className="textfield">
                <input
                  pattern="\d+"
                  maxLength="10"
                  id="phonenumber"
                  type="text"
                  value={PhNumber}
                  onChange={(e) => setPhNumber(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div style={{ alignItems: 'center' }}>
            <button type="submit" className='infobtn'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
