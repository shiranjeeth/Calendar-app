import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteInterview } from '../store/slices/interviewSlice';
import { showNotification } from '../store/slices/notificationSlice';
import { format } from 'date-fns';

const InterviewModal = ({ interview, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${interview.id}`);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      dispatch(deleteInterview(interview.id));
      dispatch(showNotification({
        type: 'success',
        message: 'Interview deleted successfully'
      }));
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-full sm:max-w-lg w-11/12"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">Interview Details</h2>
        <p className="text-lg mb-2"><strong>Candidate:</strong> {interview.candidateName}</p>
        <p className="text-lg mb-2"><strong>Interviewer:</strong> {interview.interviewer}</p>
        <p className="text-lg mb-2"><strong>Type:</strong> {interview.type}</p>
        <p className="text-lg mb-4"><strong>Date & Time:</strong> {format(new Date(interview.date), 'PPpp')}</p>

        <div className="flex justify-between gap-4 mt-4">
          <button
            className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="w-full sm:w-auto bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="w-full sm:w-auto bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewModal;
