import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import StatusBadge from '../../components/StatusBadge'
import api from '../../api/axios'

export default function AssignmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [assignment, setAssignment] = useState(null)
  const [status, setStatus] = useState('')
  const [minutes, setMinutes] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.get('/assignments/student').then(res => {
      const a = res.data.find(x => x.id === parseInt(id))
      if (a) {
        setAssignment(a)
        setStatus(a.status)
        setMinutes(a.minutesRead)
      }
    })
  }, [id])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await api.patch(`/assignments/${id}`, {
        status,
        minutesRead: parseInt(minutes) || 0,
      })
      setAssignment(res.data)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  if (!assignment) return <><Navbar /><div className="container page"><p>Loading...</p></div></>

  return (
    <>
      <Navbar />
      <div className="container page">
        <div className="page-header">
          <h2>{assignment.bookTitle}</h2>
          <button className="btn" style={{ background: '#eee' }} onClick={() => navigate('/student/dashboard')}>
            ← Back
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="card">
            <div style={{ display: 'flex', gap: 16 }}>
              <img
                src={assignment.coverUrl}
                alt={assignment.bookTitle}
                style={{ width: 100, height: 140, objectFit: 'cover', borderRadius: 8 }}
                onError={e => e.target.src = 'https://via.placeholder.com/100x140?text=Book'}
              />
              <div>
                <h3 style={{ marginBottom: 4 }}>{assignment.bookTitle}</h3>
                <p style={{ color: '#777', marginBottom: 8 }}>{assignment.bookAuthor}</p>
                <p style={{ fontSize: 13, marginBottom: 4 }}>Due: <strong>{assignment.dueDate}</strong></p>
                <p style={{ fontSize: 13, marginBottom: 12 }}>Assigned by: {assignment.teacherName}</p>
                <a href={assignment.bookUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                  Open Book ↗
                </a>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Update Progress</h3>
            <div className="form-group">
              <label>Current Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Minutes Read</label>
              <input
                type="number"
                min="0"
                value={minutes}
                onChange={e => setMinutes(e.target.value)}
              />
            </div>
            <button className="btn btn-success" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Progress'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
