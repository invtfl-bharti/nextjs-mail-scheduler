// First, create a shared context to manage scheduled emails
import React, { createContext, useContext, useState } from "react";

// Create the context
export const EmailSchedulerContext = createContext();

// Create a provider component
export const EmailSchedulerProvider = ({ children }) => {
  const [scheduledEmails, setScheduledEmails] = useState([
    // Your initial mock data here
  ]);

  const addScheduledEmail = (newEmail) => {
    setScheduledEmails((prev) => [...prev, newEmail]);
  };

  const deleteScheduledEmail = (id) => {
    setScheduledEmails((emails) => emails.filter((email) => email.id !== id));
  };

  return (
    <EmailSchedulerContext.Provider
      value={{
        scheduledEmails,
        addScheduledEmail,
        deleteScheduledEmail,
      }}
    >
      {children}
    </EmailSchedulerContext.Provider>
  );
};

// Update ScheduleInput.js
export const ScheduleInput = () => {
  // ... existing imports and state ...
  const { addScheduledEmail } = useContext(EmailSchedulerContext);

  const handleSchedule = () => {
    setIsScheduled(true);

    // Create the new scheduled email
    const newScheduledEmail = {
      id: Date.now(), // Simple way to generate unique IDs
      subject: selectedTemplate?.subject || "Untitled Email",
      recipientList: recipientLists[selectedList].name,
      recipientCount: recipientLists[selectedList].count,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      template: selectedTemplate?.name || "Default Template",
      sender: currentProfile,
    };

    // Add to global state
    addScheduledEmail(newScheduledEmail);
  };

  // ... rest of the component ...
};

// Update ScheduledList.js
export const ScheduledList = () => {
  const { scheduledEmails, deleteScheduledEmail } = useContext(
    EmailSchedulerContext
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteSchedule = (id) => {
    deleteScheduledEmail(id);
  };

  // ... rest of the component remains the same ...
};

// Update your main App component or layout
const App = () => {
  return (
    <EmailSchedulerProvider>
      <div className="flex gap-4">
        <ScheduleInput />
        <ScheduledList />
      </div>
    </EmailSchedulerProvider>
  );
};
