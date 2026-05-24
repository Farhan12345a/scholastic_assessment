import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import StatusBadge from '../../components/StatusBadge'
import api from '../../api/axios'

export default function TeacherDashboard() {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/assignments/teacher')
      .then(res => setAssignments(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <div className="container page">
        <div className="page-header">
          <h2>Assignments</h2>
          <button className="btn btn-primary" onClick={() => navigate('/teacher/create')}>
            + New Assignment
          </button>
        </div>

        {loading ? <p>Loading...</p> : assignments.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ color: '#777', marginBottom: 16 }}>No assignments yet.</p>
            <button className="btn btn-primary" onClick={() => navigate('/teacher/create')}>
              Create your first assignment
            </button>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Student</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Minutes Read</th>
                  <th>Assigned On</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(a => (
                  <tr key={a.id}>
                    <td>
                      <strong>{a.bookTitle}</strong><br />
                      <span style={{ color: '#777', fontSize: 12 }}>{a.bookAuthor}</span>
                    </td>
                    <td>{a.studentName}</td>
                    <td>{a.dueDate}</td>
                    <td><StatusBadge status={a.status} /></td>
                    <td>{a.minutesRead} min</td>
                    <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
