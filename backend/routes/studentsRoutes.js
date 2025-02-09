import express from 'express'
const router = express.Router()
import {
    authStudent,
    getSubjects,
    getTeachers,
    getSection,
    getStudentDetails,
    getTeacherDetails,
    getAllTeachers,
    studentSendMessage,
    searchTeachers,
    getStudentConversations
} from '../controllers/studentsController.js'
import protectRoute from '../middleware/protectRoute.js'

router.post('/login', authStudent)
router.post('/get-subjects', getSubjects)
router.post('/get-teachers', getTeachers)
router.post('/get-section', getSection)
router.post('/get-student', getStudentDetails)
router.post('/get-teacher', getTeacherDetails)
router.get('/get-all-teachers', getAllTeachers)
router.post('/send-message', studentSendMessage)
router.post('/search-teachers', searchTeachers)
router.get('/conversations', protectRoute, getStudentConversations)

export default router