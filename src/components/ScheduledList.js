import React from "react";

const ScheduledList = ({ scheduledEmails }) => {
  console.log(scheduledEmails); // Debugging log

  // Check if scheduledEmails is an array and contains data
  if (!Array.isArray(scheduledEmails)) {
    return <p>Scheduled emails data is invalid</p>;
  }

  return (
    <div className="h-full w-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Scheduled Emails</h2>
      {scheduledEmails.length > 0 ? (
        <ul className="space-y-4">
          {scheduledEmails.map((email, index) => (
            <li
              key={index}
              className="p-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <div className="mb-2">
                <strong className="text-lg">To:</strong> {email.to}
              </div>
              <div className="mb-2">
                <strong className="text-lg">From:</strong> {email.from}
              </div>
              <div className="mb-2">
                <strong className="text-lg">Description:</strong>{" "}
                {email.description}
              </div>
              <div className="mb-2">
                <strong className="text-lg">Scheduled Time:</strong>{" "}
                {email.scheduledTime}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No scheduled emails</p>
      )}
    </div>
  );
};

export default ScheduledList;
