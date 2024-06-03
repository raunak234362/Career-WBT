/* eslint-disable react/prop-types */
import { useState } from "react";

const EditQuestion = ({ questionData, handleEditQuestion, toggleEdit }) => {
  // State to manage edited question data
  const [editedQuestionData, setEditedQuestionData] = useState(questionData);

  // Function to handle changes in question fields
  const handleQuestionChange = (field, value) => {
    setEditedQuestionData({
      ...editedQuestionData,
      [field]: value,
    });
  };

  // Function to submit edited question
  const handleSubmitEdit = () => {
    // Call parent function to handle edit
    handleEditQuestion(editedQuestionData);
  };

  return (
    <div className=" overflow-y-auto h-100">
      <h1 className="text-xl font-bold">Edit Question</h1>
      <form onSubmit={handleSubmitEdit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Question:
          </label>
          <input
            type="text"
            value={editedQuestionData.question}
            onChange={(e) => handleQuestionChange("question", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
            <label>Answer:</label>
            <input
              type="text"
              value={editedQuestionData.answer}
              onChange={(e) => handleQuestionChange("answer", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Set:</label>
          <select
            value={editedQuestionData.set}
            onChange={(e) => handleQuestionChange("set", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Set</option>
            <option value="a">A</option>
            <option value="b">B</option>
          </select>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Difficulty:</label>
            <select
              value={editedQuestionData.difficulty}
              onChange={(e) => handleQuestionChange("difficulty", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value=''>Select Difficulty</option>
                  <option value='easy'>Easy</option>
                  <option value='moderate'>Moderate</option>
                  <option value='hard'>Hard</option>
            </select>
        </div>
        {/* Add other fields for editing here */}
        <div className="flex gap-5 full flex-row mx-5">
          <button
            type="submit"
            className="bg-green-500 w-2/3 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="bg-red-300 w-1/4 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            onClick={toggleEdit}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuestion;
