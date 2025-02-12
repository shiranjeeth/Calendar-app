import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from 'date-fns/locale';
import { useSelector } from 'react-redux';
import InterviewModal from './InterviewModal';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS }
});

const InterviewCalendar = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const interviews = useSelector(state => state.interviews.interviews);

  const handleSelectEvent = (event) => {
    const interview = interviews.find(i => i.id === event.id);
    if (interview) {
      setSelectedInterview(interview);
    }
  };

  const events = interviews.map(interview => ({
    id: interview.id,
    title: `${interview.candidateName} - ${interview.type}`,
    start: new Date(interview.date),
    end: new Date(new Date(interview.date).setHours(new Date(interview.date).getHours() + 1)),
    resource: interview.interviewer
  }));

  return (
    <div className="max-w-full mx-auto px-4 py-4 bg-white rounded-lg shadow-md">
      <div className="overflow-x-auto w-full">
        <div className="min-w-full sm:min-w-[400px] md:min-w-[600px] lg:min-w-[900px] xl:min-w-[1000px] max-w-full">
          <div className="h-[80vh] sm:h-[80vh] md:h-[600px] lg:h-[700px] xl:h-[800px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              onSelectEvent={handleSelectEvent}
              className="w-full"
              views={['month', 'week', 'day']}
              defaultView="month"
            />
          </div>
        </div>
      </div>
      {selectedInterview && (
        <InterviewModal
          interview={selectedInterview}
          onClose={() => setSelectedInterview(null)}
        />
      )}
    </div>
  );
};

export default InterviewCalendar;
