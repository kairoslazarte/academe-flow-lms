import express from 'express'
const router = express.Router()
import {
    authTeacher,
    getTeacherSubjects,
    attachFileToSubject,
    getSubjectDetails,
    getSectionDetails,
    attachFileToSection,
    deleteSubjectFile,
    deleteSectionFile,
    getAllStudents,
    getTeacherConversations
} from '../controllers/teachersController.js'
import protectRoute from '../middleware/protectRoute.js'

router.post('/login', authTeacher)
router.post('/get-teacher-subjects', getTeacherSubjects)
router.post('/attach-subject-file', attachFileToSubject)
router.post('/get-subject-details', getSubjectDetails)
router.post('/get-section-details', getSectionDetails)
router.post('/attach-section-file', attachFileToSection)
router.post('/delete-subject-file', deleteSubjectFile)
router.post('/delete-section-file', deleteSectionFile)
router.get('/get-all-students', getAllStudents)
router.get('/conversations', protectRoute, getTeacherConversations)

export default router