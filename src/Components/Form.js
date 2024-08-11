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
    sessionStorage.setItem('username',username);
    sessionStorage.setItem('UID',UID);
    sessionStorage.setItem('Course',course);
    sessionStorage.setItem('Department',Department);
    sessionStorage.setItem('Year',Year);
    sessionStorage.setItem('PhNumber',PhNumber);
    sessionStorage.setItem('Email',Email);
    try {
      await axios.post('https://boot-camp-server-r1kd.vercel.app/submit-info', data);
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
              <option value="course1">Frontend</option>
              <option value="course2">Backend</option>
              <option value="course3">UI/UX</option>
              <option value="course4">Trading</option>
              <option value="course5">DSA</option>
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
