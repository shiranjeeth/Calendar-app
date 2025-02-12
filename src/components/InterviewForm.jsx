import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addInterview, updateInterview } from '../store/slices/interviewSlice';
import { showNotification } from '../store/slices/notificationSlice';

const InterviewForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const interviews = useSelector(state => state.interviews.interviews);

  const [formData, setFormData] = useState({
    candidateName: '',
    interviewer: '',
    date: new Date(),
    type: 'Technical',
  });

  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (id) {
      const interview = interviews.find(i => i.id === parseInt(id));
      if (interview) {
        const interviewDate = new Date(interview.date);
        setFormData({
          ...interview,
          date: interviewDate
        });
      }
    }
  }, [id, interviews]);

  const isValidDateTime = (selectedDate) => {
    const now = new Date();

    if (selectedDate.getDate() === now.getDate() &&
        selectedDate.getMonth() === now.getMonth() &&
        selectedDate.getFullYear() === now.getFullYear()) {
      return selectedDate.getTime() > now.getTime();
    }
    
    return selectedDate > now;
  };

  const handleDateChange = (date) => {
    if (!isValidDateTime(date)) {
      setDateError('Cannot schedule interviews in the past. Please select a future date and time.');
      return;
    }
    setDateError('');
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidDateTime(formData.date)) {
      setDateError('Cannot schedule interviews in the past. Please select a future date and time.');
      return;
    }

    try {
      if (id) {
        dispatch(updateInterview({
          ...formData,
          id: parseInt(id),
          date: formData.date, 
        }));
        dispatch(showNotification({
          type: 'success',
          message: 'Interview updated successfully',
        }));
      } else {
        dispatch(addInterview({
          id: Date.now(),
          ...formData,
        }));
        dispatch(showNotification({
          type: 'success',
          message: 'Interview scheduled successfully',
        }));
      }
      navigate('/'); 
    } catch (error) {
      dispatch(showNotification({
        type: 'error',
        message: error.message,
      }));
    }
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  return (
    <div className="max-w-full sm:max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {id ? 'Edit Interview' : 'Schedule New Interview'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700 mb-2">
            Candidate Name
          </label>
          <input
            type="text"
            id="candidateName"
            value={formData.candidateName}
            onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="interviewer" className="block text-sm font-medium text-gray-700 mb-2">
            Interviewer
          </label>
          <select
            id="interviewer"
            value={formData.interviewer}
            onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Interviewer</option>
            <option value="Shiranjeeth">Shiranjeeth</option>
            <option value="Sherwin">Sherwin</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date and Time
          </label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            minTime={formData.date.getDate() === new Date().getDate() ? new Date() : new Date(0, 0, 0, 0, 0)}
            maxTime={new Date(0, 0, 0, 23, 59)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {dateError && <p className="text-red-600 text-sm mt-2">{dateError}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Interview Type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Technical">Technical</option>
            <option value="HR">HR</option>
            <option value="Behavioral">Behavioral</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            disabled={!!dateError}
          >
            {id ? 'Update Interview' : 'Schedule Interview'}
          </button>
          <button
            type="button"
            className="mt-4 sm:mt-0 sm:w-auto w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewForm;
