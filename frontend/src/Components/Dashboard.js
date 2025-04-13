import React, { useState } from "react";

const Dashboard = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCourseList, setShowCourseList] = useState(false);
  const [courses, setCourses] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const userId = localStorage.getItem("userId");

  const toggleOptions = () => {
    setShowOptions(!showOptions);
    setShowAddForm(false);
    setShowCourseList(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const subject = e.target.subject.value;
    const grade = e.target.grade.value;

    let pdfUrl = null;
    if (pdfFile) {
      pdfUrl = URL.createObjectURL(pdfFile);
    }

    const newCourse = {
      id: Date.now(),
      title,
      subject,
      grade,
      attachment: pdfFile ? pdfFile.name : null,
      attachmentUrl: pdfUrl,
    };

    setCourses((prev) => [...prev, newCourse]);
    setShowAddForm(false);
    setPdfFile(null);
    e.target.reset();
  };

  const handleCheckboxChange = (id) => {
    setSelectedCourses((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCourses.length === courses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(courses.map((c) => c.id));
    }
  };

  const deleteSelectedCourses = () => {
    setCourses(courses.filter((course) => !selectedCourses.includes(course.id)));
    setSelectedCourses([]);
    setCompletedCourses((prev) => prev.filter((id) => !selectedCourses.includes(id)));
  };

  const markSelectedAsCompleted = () => {
    setCompletedCourses((prev) => {
      const newCompleted = [...prev];
      selectedCourses.forEach((id) => {
        if (newCompleted.includes(id)) {
          const idx = newCompleted.indexOf(id);
          newCompleted.splice(idx, 1);
        } else {
          newCompleted.push(id);
        }
      });
      return newCompleted;
    });
  };

  return (
    <div style={{ backgroundImage: "url('/e-learning-theme.png')", backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "#fff", fontWeight: "600", fontSize: "1rem" }}>
            Welcome {userId}. This is your dashboard.
          </span>
          <button onClick={toggleOptions} style={buttonStyle}>Course</button>
        </div>
        <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: "#d63031" }}>Logout</button>
      </div>

      {showOptions && (
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <button onClick={() => { setShowAddForm(true); setShowCourseList(false); }} style={optionButtonStyle}>➕ Add Course</button>
          <button onClick={() => { setShowCourseList(true); setShowAddForm(false); }} style={optionButtonStyle}>👁 View Courses</button>
        </div>
      )}

      {showAddForm && (
        <div style={cardStyle}>
          <h3>Add New Course</h3>
          <form onSubmit={handleAddCourse} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input name="title" placeholder="Title" required style={inputStyle} />
            <input name="subject" placeholder="Subject" required style={inputStyle} />
            <input name="grade" placeholder="Grade" required style={inputStyle} />
            <input name="attachment" type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} style={inputStyle} />
            <button type="submit" style={submitStyle}>Add</button>
          </form>
        </div>
      )}

      {showCourseList && (
        <div style={cardStyle}>
          <h3>Course List</h3>
          {courses.length === 0 ? (
            <p>No courses added yet.</p>
          ) : (
            <>
              <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
                <button onClick={markSelectedAsCompleted} style={optionButtonStyle}>✅ Mark Completed</button>
                <button onClick={deleteSelectedCourses} style={{ ...optionButtonStyle, backgroundColor: "#d63031", color: "white" }}>🗑 Delete Selected</button>
              </div>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={headerStyle}><input type="checkbox" checked={selectedCourses.length === courses.length} onChange={toggleSelectAll} /></th>
                    <th style={headerStyle}>Title</th>
                    <th style={headerStyle}>Subject</th>
                    <th style={headerStyle}>Grade</th>
                    <th style={headerStyle}>PDF</th>
                    <th style={headerStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => {
                    const isCompleted = completedCourses.includes(c.id);
                    return (
                      <tr key={c.id} style={{ backgroundColor: isCompleted ? "#d4edda" : "white" }}>
                        <td style={thTdStyle}>
                          <input type="checkbox" checked={selectedCourses.includes(c.id)} onChange={() => handleCheckboxChange(c.id)} />
                        </td>
                        <td style={thTdStyle}>{c.title}</td>
                        <td style={thTdStyle}>{c.subject}</td>
                        <td style={thTdStyle}>{c.grade}</td>
                        <td style={thTdStyle}>
                          {c.attachmentUrl ? (
                            <a href={c.attachmentUrl} download={c.attachment}>{c.attachment}</a>
                          ) : ("—")}
                        </td>
                        <td style={thTdStyle}>{isCompleted ? "Completed" : "Pending"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const cardStyle = { backgroundColor: "rgba(255,255,255,0.95)", padding: "2rem", borderRadius: "10px", marginTop: "2rem", maxWidth: "1000px", marginLeft: "auto", marginRight: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" };
const optionButtonStyle = { padding: "0.5rem 1rem", borderRadius: "5px", border: "none", backgroundColor: "#dfe6e9", cursor: "pointer", fontWeight: "500" };
const inputStyle = { padding: "0.8rem", borderRadius: "5px", border: "1px solid #ccc" };
const submitStyle = { padding: "0.8rem", backgroundColor: "#0984e3", color: "white", border: "none", borderRadius: "5px", fontWeight: "600", cursor: "pointer" };
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "1rem", textAlign: "left", backgroundColor: "#fff" };
const thTdStyle = { border: "1px solid #ccc", padding: "0.75rem" };
const headerStyle = { ...thTdStyle, backgroundColor: "#f1f2f6", fontWeight: "600" };
const buttonStyle = { padding: "0.4rem 0.8rem", backgroundColor: "#0984e3", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.9rem", cursor: "pointer" };

export default Dashboard;