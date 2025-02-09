import express from 'express'
const router = express.Router()
import {
    authAdmin,
    createTeacherAccount,
    getAllTeachers,
    createCategory,
    getAllClassCategories,
    createLevel,
    getAllLevels,
    getLevel,
    createSection,
    getAllSections,
    createSubject,
    getAllSubjects,
    createSchedule,
    deleteTeachers,
    deleteAllClasses,
    getTeacherDetails,
    createStudentAccount,
    getAllStudents,
    searchStudents,
    deleteStudents,
    deleteSections,
    getSection,
    updateStudentAccount,
    removeStudentFromSection,
    removeSubjectFromSection,
    createNewAndUpdates,
    editNewsAndUpdates,
    getNewsAndUpdates,
    addStudentInSection,
    addSubjectInSection,
    updateSection,
    getSubject,
    addSubjectSchedule,
    deleteSubjectSchedule,
    updateSubjectTeacher,
    updateTeacherAccount,
    uploadNewsletterMemos,
    getNewslettersMemos,
    deleteNewsletter,
    deleteNewsAndUpdates
} from '../controllers/adminsController.js'

router.post('/login', authAdmin)
router.post('/create-teacher', createTeacherAccount)
router.get('/get-teachers', getAllTeachers)
router.post('/create-category', createCategory)
router.get('/get-categories', getAllClassCategories)
router.post('/create-level', createLevel)
router.post('/get-levels', getAllLevels)
router.post('/get-level', getLevel)
router.post('/create-section', createSection)
router.post('/get-sections', getAllSections)
router.post('/create-subject', createSubject)
router.get('/get-subjects', getAllSubjects)
router.post('/create-schedule', createSchedule)
router.post('/delete-teacher', deleteTeachers)
router.post('/delete-all-classes', deleteAllClasses)
router.get('/get-teacher-details', getTeacherDetails)
router.post('/create-student', createStudentAccount)
router.get('/get-students', getAllStudents)
router.post('/search-students',searchStudents)
router.post('/delete-student', deleteStudents)
router.post('/delete-sections', deleteSections)
router.post('/get-section', getSection)
router.post('/update-student', updateStudentAccount)
router.post('/remove-student', removeStudentFromSection)
router.post('/remove-subject', removeSubjectFromSection)
router.post('/create-news-updates', createNewAndUpdates)
router.post('/edit-news-updates', editNewsAndUpdates)
router.get('/get-news-updates', getNewsAndUpdates)
router.post('/add-student-section', addStudentInSection)
router.post('/add-subject-section', addSubjectInSection)
router.post('/update-adviser-section', updateSection)
router.post('/get-subject', getSubject)
router.post('/add-subject-schedule', addSubjectSchedule)
router.post('/delete-subject-schedule', deleteSubjectSchedule)
router.post('/update-subject-teacher', updateSubjectTeacher)
router.post('/update-teacher', updateTeacherAccount)
router.post('/upload-newsletter-memo', uploadNewsletterMemos)
router.get('/get-newsletters-memos', getNewslettersMemos)
router.post('/delete-newsletters-memos', deleteNewsletter)
router.post('/delete-news-updates', deleteNewsAndUpdates)

export default router