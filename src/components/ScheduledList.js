import React from "react";

const ScheduledList = ({ scheduledEmails = [], handleScheduleEmail }) => {
  // Use scheduledEmails or an empty array if undefined

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Scheduled Emails</h3>
      {scheduledEmails.length === 0 ? (
        <p>No emails scheduled yet.</p>
      ) : (
        <ul>
          {scheduledEmails.map((email) => (
            <li key={email.id} className="py-2 border-b">
              <strong>{email.template}</strong> - {email.subject} scheduled for{" "}
              {email.scheduleDate} at {email.scheduleTime}
            </li>
          ))}
        </ul>
      )}

      
    </div>
  );
};

export default ScheduledList;
