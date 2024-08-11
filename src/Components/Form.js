import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [UID, setUID] = useState('');
  const [PhNumber, setPhNumber] = useState('');
  const [course, setCourse] = useState('');
  const [Department, setDepartment] = useState('');
  const [Year, setYear] = useState('');
  const navigate = useNavigate();

  const handleSubmition = () => {
    navigate('/Choice');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = { username, UID, course, Department, Year, PhNumber, Email };

  console.log('Submitting data:', JSON.stringify(data, null, 2));
  sessionStorage.setItem('username', username);
  sessionStorage.setItem('UID', UID);
  sessionStorage.setItem('Course', course);
  sessionStorage.setItem('Department', Department);
  sessionStorage.setItem('Year', Year);
  sessionStorage.setItem('PhNumber', PhNumber);
  sessionStorage.setItem('Email', Email);
  
  try {
    await axios.post('https://boot-camp-server-chi.vercel.app/submit-info', data);
    handleSubmition();
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Server error:', error.response.data);
      console.error('Status code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // No response received from server
      console.error('No response received:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error setting up request:', error.message);
    }
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
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Trading">Trading</option>
              <option value="DSA">DSA</option>
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
              <option value="AU-1">AU-1</option>
              <option value="AU-2">AU-2</option>
              <option value="AU-3">AU-3</option>
              <option value="AU-4">AU-4</option>
              <option value="AU-5">AU-5</option>
              <option value="Aerospace Engg.">Aerospace Engg.</option>
              <option value="CSE-AIT">CSE-AIT</option>
              <option value="Automobile Engg.">Automobile Engg.</option>
              <option value="Biotech Engineering">Biotech Engineering</option>
              <option value="Chemical Engg.">Chemical Engg.</option>
              <option value="Civil Engg.">Civil Engg.</option>
              <option value="CSE 2nd year">CSE 2nd year</option>
              <option value="CSE 3rd year">CSE 3rd year</option>
              <option value="CSE 4th year">CSE 4th year</option>
              <option value="ECE">ECE</option>
              <option value="EE">EE</option>
              <option value="Mechanical Engg.">Mechanical Engg.</option>
              <option value="Mechatronics">Mechatronics</option>
              <option value="Petroleum">Petroleum</option>
              <option value="UIC">UIC</option>
              <option value="UILA">UILA</option>
              <option value="UILA(English)">UILA(English)</option>
              <option value="UIFVA-Film Studies">UIFVA-Film Studies</option>
              <option value="UID-Fashion Design">UID-Fashion Design</option>
              <option value="UID-Fine Arts">UID-Fine Arts</option>
              <option value="UID-Industrial Design">UID-Industrial Design</option>
              <option value="UID-Interior Design">UID-Interior Design</option>
              <option value="UIMS- Media Studies">UIMS- Media Studies</option>
              <option value="UIA-Architecture">UIA-Architecture</option>
              <option value="UITTR">UITTR</option>
              <option value="UIFVA-Animation">UIFVA-Animation</option>
              <option value="USB-BBA">USB-BBA</option>
              <option value="USB-Commerce">USB-Commerce</option>
              <option value="MBA-AIT">MBA-AIT</option>
              <option value="USB-MBA">USB-MBA</option>
              <option value="UITHM-1st year HHM and culinary sciences">UITHM-1st year HHM and culinary sciences</option>
              <option value="UITHM- RCM&REM">UITHM- RCM&REM</option>
              <option value="UITHM-TTM,MBA-THM, Ph.D">UITHM-TTM,MBA-THM, Ph.D</option>
              <option value="UITHM-AAM">UITHM-AAM</option>
              <option value="LLB Program and LLM Program B.Com BA. LLB .">LLB Program and LLM Program B.Com BA. LLB .</option>
              <option value="LLB Program">LLB Program</option>
              <option value="UIAHS-Nutrition & Optometry">UIAHS-Nutrition & Optometry</option>
              <option value="UIAHS-MLT">UIAHS-MLT</option>
              <option value="UIAHS- FORENSIC SCIENCE">UIAHS- FORENSIC SCIENCE</option>
              <option value="UIAHS-Physiotherapy">UIAHS-Physiotherapy</option>
              <option value="UIPS-Pharmacy">UIPS-Pharmacy</option>
              <option value="UIN-Nursing">UIN-Nursing</option>
              <option value="UIAS">UIAS</option>
              <option value="UIBT">UIBT</option>
              <option value="UIS-Chemistry">UIS-Chemistry</option>
              <option value="UIS- Math">UIS- Math</option>
              <option value="UIS-Physics">UIS-Physics</option>
              <option value="Biosciences">Biosciences</option>
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
