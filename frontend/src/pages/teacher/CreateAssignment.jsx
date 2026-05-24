import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import api from '../../api/axios'

export default function CreateAssignment() {
  const [books, setBooks] = useState([])
  const [students, setStudents] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [selectedStudents, setSelectedStudents] = useState([])
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([api.get('/books'), api.get('/users/students')])
      .then(([booksRes, studentsRes]) => {
        setBooks(booksRes.data)
        setStudents(studentsRes.data)
      })
  }, [])

  const toggleStudent = (id) => {
    setSelectedStudents(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedBook) return setError('Please select a book')
    if (selectedStudents.length === 0) return setError('Please select at least one student')
    if (!dueDate) return setError('Please set a due date')
    setError('')
    setLoading(true)
    try {
      await api.post('/assignments', {
        bookId: selectedBook,
        studentIds: selectedStudents,
        dueDate,
      })
      navigate('/teacher/dashboard')
    } catch (err) {
      setError('Failed to create assignment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container page">
        <div className="page-header">
          <h2>Create Assignment</h2>
          <button className="btn" style={{ background: '#eee' }} onClick={() => navigate('/teacher/dashboard')}>
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card mb-4">
            <h3 style={{ marginBottom: 16 }}>1. Select a Book</h3>
            <div className="books-grid">
              {books.map(book => (
                <div
                  key={book.id}
                  className={`book-card ${selectedBook === book.id ? 'selected' : ''}`}
                  onClick={() => setSelectedBook(book.id)}
                >
                  <img src={book.coverUrl} alt={book.title} onError={e => e.target.src = 'https://via.placeholder.com/200x160?text=Book'} />
                  <div className="book-card-info">
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card mb-4">
            <h3 style={{ marginBottom: 16 }}>2. Select Students</h3>
            <div className="students-list">
              {students.map(s => (
                <div key={s.id} className="student-item">
                  <input
                    type="checkbox"
                    id={`s-${s.id}`}
                    checked={selectedStudents.includes(s.id)}
                    onChange={() => toggleStudent(s.id)}
                  />
                  <label htmlFor={`s-${s.id}`}>{s.name} — {s.email}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="card mb-4">
            <h3 style={{ marginBottom: 16 }}>3. Set Due Date</h3>
            <div className="form-group" style={{ maxWidth: 300 }}>
              <input
                type="date"
                value={dueDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="error mb-4">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Assigning...' : 'Assign Book'}
          </button>
        </form>
      </div>
    </>
  )
}
