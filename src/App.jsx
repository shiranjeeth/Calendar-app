import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import InterviewForm from './components/InterviewForm';
import InterviewCalendar from './components/InterviewCalendar';
import Notifications from './components/Notifications';
import styled from 'styled-components';

const NavBar = styled.nav`
  background: #2c3e50;
  padding: 1rem;
  color: white;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 1rem;
  
  &:hover {
    color: #3498db;
  }
`;

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar>
            <NavLink to="/">Calendar</NavLink>
            <NavLink to="/schedule">Schedule Interview</NavLink>
          </NavBar>
          
          <Notifications />
          
          <Routes>
            <Route path="/" element={<InterviewCalendar />} />
            <Route path="/schedule" element={<InterviewForm />} />
            <Route path="/edit/:id" element={<InterviewForm editMode />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};  

export default App;