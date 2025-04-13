import React, { useState } from "react";
// import "./App.css";

function Courses() {
  const [showOptions, setShowOptions] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCourseList, setShowCourseList] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setShowAddForm(false);
    setShowCourseList(false);
  };

  return (
    <div className="container">
      <h2>Course List</h2>
      <button onClick={toggleOptions} className="primary-btn">
        Course
      </button>

      {showOptions && (
        <div className="slide-down">
          <button
            onClick={() => {
              setShowAddForm(true);
              setShowCourseList(false);
            }}
          >
            ➕ Add Course
          </button>
          <button
            onClick={() => {
              setShowCourseList(true);
              setShowAddForm(false);
            }}
          >
            👁️ View Courses
          </button>
        </div>
      )}

      {showAddForm && (
        <div className="form-section">
          <h3>Add New Course</h3>
          <form>
            <input type="text" placeholder="Course Title" required />
            <input type="text" placeholder="Subject" required />
            <input type="text" placeholder="Grade" required />
            <input type="file" />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {showCourseList && (
        <div className="list-section">
          <h3>Course List</h3>
          {/* Render your course list here */}
          <p>No courses to show yet.</p>
        </div>
      )}
    </div>
  );
}

export default Courses;
