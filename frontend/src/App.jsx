import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import CreateAssignment from './pages/teacher/CreateAssignment'
import StudentDashboard from './pages/student/StudentDashboard'
import AssignmentDetail from './pages/student/AssignmentDetail'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teacher/dashboard" element={
            <PrivateRoute role="TEACHER"><TeacherDashboard /></PrivateRoute>
          } />
          <Route path="/teacher/create" element={
            <PrivateRoute role="TEACHER"><CreateAssignment /></PrivateRoute>
          } />
          <Route path="/student/dashboard" element={
            <PrivateRoute role="STUDENT"><StudentDashboard /></PrivateRoute>
          } />
          <Route path="/student/assignment/:id" element={
            <PrivateRoute role="STUDENT"><AssignmentDetail /></PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
