This project is an Interview Scheduling System built with React and Redux for managing interviews, allowing users to schedule, edit, and delete interviews, as well as view them in a calendar. It also integrates a notification system to display success or error messages based on actions taken.

 # Features Implemented

 # Interview Scheduling
 - Schedule an Interview: Users can schedule an interview by providing:
 - Candidate name
 - Interviewer name
 - Date and time of the interview
 - Type of interview (Technical, HR, Behavioral)
 - The system validates to ensure that interviews cannot be scheduled in the past.

 #  Interview Dashboard (Calendar View)
 - View Scheduled Interviews: A calendar (react-big-calendar) is used to display scheduled interviews.
 - Filter Interviews: Interviews can be filtered by date, interviewer, or candidate.
 - Select and View Interview Details: When a user clicks on an interview in the calendar, its details (Candidate, Interviewer, Type, Date & Time) are displayed in a modal.

 # Rescheduling/Editing Interviews
 - Edit an Interview: Users can edit the details of an interview (date, interviewer, candidate, type).
 - The changes are persisted in the system after submitting the form.

 # Deleting Interviews
Delete an Interview: Users can delete an interview after confirming their action through a prompt.

 # Notifications
 - Success/Failure Notifications: After actions like scheduling, editing, or deleting interviews, success or error messages  are displayed using a notification system.
 - Notifications disappear automatically after 3 seconds.

 # Tech Stack
 - React: The core library for building the UI.
 - Redux: Used for state management. Redux Toolkit simplifies actions related to interviews and notifications.
 - react-big-calendar: A calendar library to show the scheduled interviews in a calendar view.
 - Date-fns: Used to handle date and time formatting and manipulation.
 - React Datepicker: Used for selecting dates and times for scheduling interviews.
 - Tailwind CSS: A utility-first CSS framework used for styling the components.




 # How to Use

 #  Scheduling an Interview
 - Go to the Schedule New Interview form.
 - Enter the candidate name, interviewer, date/time, and interview type.
 - Submit the form to schedule the interview. The interview will then appear in the calendar.
 # Viewing, Editing, and Deleting an Interview
 - Click on an interview in the calendar to view its details.
 - You can edit or delete the interview. If you delete it, a confirmation prompt will appear before the interview is removed from the calendar.
 # Notifications
 - After scheduling, editing, or deleting an interview, a notification will appear on the screen for a few seconds to confirm success or show an error.

 # State Management
 - Interviews State: The Redux store holds an array of interviews, each with details like candidate name, interviewer, date/time, and type.
 - Notifications State: The notifications state is used to display temporary success or error messages for actions like scheduling or editing interviews.



  # Challenges faced

  #  Persistent Data Management:
- Ensuring that the interview data is properly persisted in the Redux store and remains consistent across page reloads was another challenge.

  # Date and Time Validation
Another challenge was implementing robust validation for date and time selection. Ensuring that users cannot schedule interviews in the past and handling edge cases, like selecting the current date and time


Installation
Clone the repository:

git clone https://github.com/shiranjeeth/Calendar-app.git

# Navigate into the project directory:

 - cd client

 # Install the dependencies:

- npm install

 # Run the development server:

- npm run dev

# GitHub Link
 - [ https://github.com/shiranjeeth/Calendar-app ]