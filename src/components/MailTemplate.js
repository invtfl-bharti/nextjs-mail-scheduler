import { useState, useEffect } from "react";
import {
  Pencil,
  Save,
  Instagram,
  Facebook,
  Link2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

const MAX_SUBJECT_LENGTH = 35;
const MAX_BODY_LENGTH = 100;

const MailTemplateEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/templates");
        const data = await res.json();

        if (data.length > 0) {
          setSelectedTemplate(data[0]);
          setSubject(data[0].subject);
          setBody(data[0].body);
        }

        setTemplates(data);
      } catch (err) {
        setError("Failed to load templates");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const validateInput = () => {
    if (subject.length > MAX_SUBJECT_LENGTH) {
      setError(`Subject must be ${MAX_SUBJECT_LENGTH} characters or less`);
      return false;
    }
    if (body.length > MAX_BODY_LENGTH) {
      setError(`Body must be ${MAX_BODY_LENGTH} characters or less`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSubject(template.subject);
    setBody(template.body);
    setIsEditing(false);
    setError(null);
    setIsDropdownOpen(false);
  };

  const handleSaveChanges = async () => {
    if (!validateInput()) return;

    try {
      const updatedData = { subject, body };

      const res = await fetch(`/api/templates/${selectedTemplate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to save changes");

      const updatedTemplate = await res.json();
      setSelectedTemplate(updatedTemplate); // Fix: No extra property access
      setIsEditing(false);
    } catch (err) {
      setError("Failed to save changes");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl w-1/2 h-[95vh] mx-auto flex flex-col justify-between bg-white rounded-lg shadow">
      <div className="p-6 border-b bg-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-500 p-2">Mail Template</h2>
          {selectedTemplate && (
            <button
              onClick={() =>
                isEditing ? handleSaveChanges() : setIsEditing(true)
              }
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black hover:bg-yellow-500 rounded-md transition-colors"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" /> Save
                </>
              ) : (
                <>
                  <Pencil className="w-4 h-4" /> Edit
                </>
              )}
            </button>
          )}
        </div>

        {/* Template Dropdown Selection */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full p-3 border rounded-lg flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700">
              {selectedTemplate ? selectedTemplate.name : "Select a template"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <span className="font-medium">{template.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!selectedTemplate ? (
        <div className="w-full h-full flex flex-col items-center justify-center ">
          <div className="p-4 bg-purple-200 rounded-lg">
            <h2 className="text-xl font-bold">No Template Selected</h2>
            <p>You can select a mail template above</p>
          </div>
        </div>
      ) : (
        <div className="p-6 w-full h-full flex flex-col justify-between overflow-scroll no-scrollbar">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          {/* Subject Line */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={!isEditing}
              className="w-full p-4 border rounded-lg transition-colors"
              placeholder="Enter email subject"
            />
          </div>

          {/* Body Content */}
          <div className="mb-6">
            <label className="block text-gray-700">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={!isEditing}
              className="w-full p-4 border rounded-lg min-h-[100px] resize-none transition-colors"
              placeholder="Enter email body"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveChanges}
            disabled={!isEditing}
            className="w-full py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default MailTemplateEditor;
