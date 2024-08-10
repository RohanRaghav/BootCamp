import React, { useState } from 'react';
import './App.css';
import Form from './Components/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Revision from './Components/Revision';
import Submission from './Components/Submission';
import Questionpaper from './Components/Questionpaper';
import Choice from './Components/Choice';
import Thanks from './Components/Thanks';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <UserProvider>
            <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
                <header>
    <img src='Cac_logo.png' alt='logo' style={{width:150,height:150, float:'left',padding:10,zIndex:-1}} />
                    <h1 className='coloring'>Connecting all circles</h1>
                    <div className='togglepos'>
                        <label className="switch">
                            <span className="sun">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g fill="#ffd43b">
                                        <circle r="5" cy="12" cx="12"></circle>
                                        <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
                                    </g>
                                </svg>
                            </span>
                            <span className="moon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                                </svg>
                            </span>   
                            <input type="checkbox" className="input" onChange={toggleTheme} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </header>
                <main>
                    <Router>
                        <Routes>
                            <Route path="/revision" element={<Revision />} />
                            <Route path="/submission" element={<Submission  />} />
                            <Route path="/questionpaper" element={<Questionpaper />} />
                            <Route path="/Choice" element={<Choice />} />
                            <Route path="/Thanks" element={<Thanks />} />
                            <Route path="/" element={<Form />} />
                        </Routes>
                    </Router>
                </main>
                <footer>
                    <ul className="wrappers" style={{ position: 'relative', top: '90%' }}>
                        <li className="icon facebook">
                            <span className="tooltip">Facebook</span>
                            <svg viewBox="0 0 320 512" height="1.2em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                            </svg>
                        </li>
                        <li className="icon twitter">
                            <span className="tooltip">Twitter</span>
                            <svg height="1.8em" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="twitter">
                                <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                            </svg>
                        </li>
                        <li className="icon instagram">
                            <span className="tooltip">Instagram</span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.063 2.633.333 3.608 1.308.974.974 1.244 2.24 1.308 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.063 1.366-.333 2.633-1.308 3.608-.974.974-2.24 1.244-3.608 1.308-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.069c-1.366-.063-2.633-.333-3.608-1.308-.974-.974-1.244-2.24-1.308-3.608-.058-1.265-.069-1.645-.069-4.849s.012-3.584.069-4.849c.063-1.366.333-2.633 1.308-3.608.974-.974 2.24-1.244 3.608-1.308 1.265-.057 1.645-.068 4.849-.068m0-2.163c-3.259 0-3.67.014-4.947.072-1.277.059-2.556.335-3.538 1.317-.982.982-1.258 2.261-1.317 3.538-.058 1.276-.072 1.687-.072 4.947s.014 3.67.072 4.947c.059 1.277.335 2.556 1.317 3.538.982.982 2.261 1.258 3.538 1.317 1.276.058 1.687.072 4.947.072s3.67-.014 4.947-.072c1.277-.059 2.556-.335 3.538-1.317.982-.982 1.258-2.261 1.317-3.538.058-1.276.072-1.687.072-4.947s-.014-3.67-.072-4.947c-.059-1.277-.335-2.556-1.317-3.538-.982-.982-2.261-1.258-3.538-1.317-1.276-.058-1.687-.072-4.947-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.208 0-4-1.792-4-4s1.792-4 4-4 4 1.792 4 4-1.792 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z"></path>
                            </svg>
                        </li>
                    </ul>
                </footer>
            </div>
        </UserProvider>
    );
};

export default App;
