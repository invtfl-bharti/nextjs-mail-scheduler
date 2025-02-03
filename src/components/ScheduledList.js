import React, { useState } from "react";
import { Calendar, Clock, Mail, Trash2, Search } from "lucide-react";

const ScheduledList = () => {
  // Mock data for scheduled emails - in a real app, this would come from an API or store
  const [scheduledEmails, setScheduledEmails] = useState([
    {
      id: 1,
      subject: "Free Trial Offer",
      recipientList: "Active Subscribers",
      recipientCount: 156,
      scheduledDate: new Date(Date.now() + 86400000), // Tomorrow
      scheduledTime: { hours: 10, minutes: 30, period: "AM" },
      template: "Free Trial Template",
      sender: {
        name: "Marry Kehlani",
        email: "kehlani@gmail.com",
        image: "/api/placeholder/48/48",
      },
    },
    {
      id: 2,
      subject: "Welcome Email",
      recipientList: "New Users",
      recipientCount: 45,
      scheduledDate: new Date(Date.now() + 172800000), // Day after tomorrow
      scheduledTime: { hours: 2, minutes: 0, period: "PM" },
      template: "Welcome Template",
      sender: {
        name: "John Smith",
        email: "john@gmail.com",
        image: "/api/placeholder/48/48",
      },
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (date) => {
    if (date.toDateString() === new Date().toDateString()) return "Today";
    if (date.toDateString() === new Date(Date.now() + 86400000).toDateString())
      return "Tomorrow";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    return `${time.hours}:${time.minutes.toString().padStart(2, "0")} ${
      time.period
    }`;
  };

  const handleDeleteSchedule = (id) => {
    setScheduledEmails((emails) => emails.filter((email) => email.id !== id));
  };

  const filteredEmails = scheduledEmails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.recipientList.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.sender.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Scheduled Emails
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by subject, recipient list, or sender..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Email List */}
      <div className="p-6">
        {filteredEmails.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No scheduled emails found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={email.sender.image}
                      alt={email.sender.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{email.subject}</h3>
                      <p className="text-sm text-gray-500">
                        {email.sender.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSchedule(email.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(email.scheduledDate)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {formatTime(email.scheduledTime)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {email.recipientList} ({email.recipientCount})
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledList;
