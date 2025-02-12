import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../store/slices/notificationSlice';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.notifications);

  useEffect(() => {
    notifications.forEach(notification => {
      setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, 3000);
    });
  }, [notifications, dispatch]);

  return (
    <div className="fixed top-5 right-5 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`p-4 rounded-md shadow-lg transform transition-all duration-300 ease-out ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
