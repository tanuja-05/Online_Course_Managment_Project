import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
function App() {
  const [course, setCourse] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const filteredCourses = course
    .filter((courseItem) =>
      courseItem.courseName.toLowerCase().includes(searchItem.toLowerCase())
    )
    .sort((a, b) => Number(a.duration) - Number(b.duration));

  const loadCourses = async () => {
    const res = await fetch("http://localhost:5000/api/courses");
    const data = await res.json();
    console.log(data);
    setCourse(data.courses);
    setLoading(false);
  };

  const addCourse = async () => {
    if (!courseCode || !courseName || !category || !duration) {
      alert("Please fill all the fields");
      return;
    }

    await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseCode, courseName, category, duration }),
    });

    console.log("Course data sent to the Backend");
    setCourseCode("");
    setCourseName("");
    setCategory("");
    setDuration("");
    loadCourses();
  };

  const updateCourse = async (courseId) => {
    const updateData = {};

    if (courseCode) updateData.courseCode = courseCode;
    if (courseName) updateData.courseName = courseName;
    if (category) updateData.category = category;
    if (duration) updateData.duration = duration;

    if (Object.keys(updateData).length === 0) {
      alert("Nothing to update");
      return;
    }

    await fetch(`http://localhost:5000/api/courses/${courseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    setCourseCode("");
    setCourseName("");
    setCategory("");
    setDuration("");
    loadCourses();
  };

  const deleteCourse = async (courseId) => {
    const confirmDelete = prompt(
      "Are you sure you want to delete this course? (y/n)"
    );
    if (confirmDelete === "y" || confirmDelete === "Y") {
      await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: "DELETE",
      });
      loadCourses();
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <>
      <div align="center">
        <h1>Online Course Management System</h1>
        <div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Search by course name..."
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              style={{ padding: "6px", width: "250px" }}
            ></input>
          </div>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Category</th>
                <th>Duration (in hours)</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan="5" align="center">
                    No courses found
                  </td>
                </tr>
              ) : (
                filteredCourses.map((courseItem) => (
                  <tr key={courseItem._id}>
                    <td>{courseItem.courseCode}</td>
                    <td>{courseItem.courseName}</td>
                    <td>{courseItem.category}</td>
                    <td>{courseItem.duration}</td>
                    <td>
                      <button onClick={() => updateCourse(courseItem._id)}>
                        Update
                      </button>
                      <button onClick={() => deleteCourse(courseItem._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div>
            <h2>Add New Course</h2>
            <label>Course Code: </label>
            <input
              type="text"
              placeholder="Enter Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            ></input>

            <br />

            <label>Course Name: </label>
            <input
              type="text"
              placeholder="Enter Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            ></input>

            <br />

            <label>Category: </label>
            <input
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></input>

            <br />

            <label>Duration (in hours): </label>
            <input
              type="text"
              placeholder="Enter Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            ></input>

            <br />

            <button onClick={addCourse}>Add Course</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
