import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import StatusBadge from '../../components/StatusBadge'
import api from '../../api/axios'

export default function StudentDashboard() {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/assignments/student')
      .then(res => setAssignments(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <div className="container page">
        <div className="page-header">
          <h2>My Assignments</h2>
        </div>

        {loading ? <p>Loading...</p> : assignments.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ color: '#777' }}>No assignments yet. Check back later!</p>
          </div>
        ) : (
          <div className="assignments-grid">
            {assignments.map(a => (
              <div key={a.id} className="assignment-card">
                <img
                  src={a.coverUrl}
                  alt={a.bookTitle}
                  onError={e => e.target.src = 'https://via.placeholder.com/80x110?text=Book'}
                />
                <h3>{a.bookTitle}</h3>
                <p>{a.bookAuthor}</p>
                <div style={{ marginBottom: 8 }}>
                  <StatusBadge status={a.status} />
                </div>
                <p style={{ fontSize: 13, color: '#555' }}>Due: {a.dueDate}</p>
                <p style={{ fontSize: 13, color: '#555', marginBottom: 12 }}>{a.minutesRead} min read</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/student/assignment/${a.id}`)}
                >
                  View / Update
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
