import React, { useState } from "react";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', subject: '', grade: '', pdf: null });
  const [showForm, setShowForm] = useState(false);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleFileChange = (e) => {
    setNewCourse({ ...newCourse, pdf: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const addCourse = (e) => {
    e.preventDefault();
    if (newCourse.title && newCourse.subject && newCourse.grade && newCourse.pdf) {
      const pdfUrl = URL.createObjectURL(newCourse.pdf);
      const courseToAdd = {
        id: Date.now(),
        title: newCourse.title,
        subject: newCourse.subject,
        grade: newCourse.grade,
        pdf: pdfUrl,
      };
      setCourses([...courses, courseToAdd]);
      setNewCourse({ title: '', subject: '', grade: '', pdf: null });
      document.getElementById('pdfInput').value = null;
      setShowForm(false);
    }
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
    setSelectedIds(selectedIds.filter((sid) => sid !== id));
  };

  return (
    <div className="container">
      <h2>Courses</h2>
      <button onClick={() => setShowForm(true)}>Add Course</button>

      {showForm && (
        <form onSubmit={addCourse} style={{ margin: '1rem 0', border: '1px solid #ccc', padding: '1rem' }}>
          <input type="text" name="title" placeholder="Course Title" value={newCourse.title} onChange={handleInputChange} required />
          <input type="text" name="subject" placeholder="Subject" value={newCourse.subject} onChange={handleInputChange} required />
          <input type="text" name="grade" placeholder="Grade" value={newCourse.grade} onChange={handleInputChange} required />
          <input type="file" id="pdfInput" accept="application/pdf" onChange={handleFileChange} required />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: '1rem' }}>Cancel</button>
        </form>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>PDF</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr
              key={course.id}
              style={{
                backgroundColor: selectedIds.includes(course.id) ? "#d4edda" : "white",
                transition: "background-color 0.3s ease",
              }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(course.id)}
                  onChange={() => toggleSelect(course.id)}
                />
              </td>
              <td>{course.title}</td>
              <td>{course.subject}</td>
              <td>{course.grade}</td>
              <td>
                <a href={course.pdf} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              </td>
              <td>
                <button onClick={() => deleteCourse(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
