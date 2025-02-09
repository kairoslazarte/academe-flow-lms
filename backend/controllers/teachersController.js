import asyncHandler from 'express-async-handler'
import generateToken from "../utils/generateToken.js";
import Teacher from '../models/teachersModel.js'
import Subject from '../models/subjectsModel.js';
import Section from '../models/sectionsModel.js';
import Level from '../models/levelsModel.js';
import Student from '../models/studentsModel.js';
import Conversation from '../models/conversationModel.js';
import User from '../models/userModel.js';

const authTeacher = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const teacher = await Teacher.findOne({ email })

    if (teacher && (await teacher.matchPassword(password))) {
        const updatedTeacher = await teacher.save();

        generateToken(updatedTeacher._id, res)
        res.json(updatedTeacher);
        res.status(200);
    }  else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const getTeacherSubjects = asyncHandler(async (req, res) => {
    const { subjectIDs } = req.body

    const subjects = await Subject.find({'_id': { $in: subjectIDs }})
    const sections = await Section.find({'_id':  { $in: subjects.map((subject) => subject.section) }})
    const levels = await Level.find({'_id': { $in: sections.map((section) => section.level) }})

    res.status(200).send({
        subjects: subjects,
        sections: sections,
        levels: levels,
    })
})

const attachFileToSubject = asyncHandler(async (req, res) => {
    const { subjectID, attachedFile } = req.body

    const subject = await Subject.findById(subjectID)

    try {
        subject.files.push({
            file: attachedFile
        })

        await subject.save()
        res.status(201).json(subject)
    } catch (error) {
        console.log(error)
    }
})

const getSubjectDetails = asyncHandler(async (req, res) => {
    const { subjectID } = req.body

    const subject = await Subject.findById(subjectID);

    if (subject) {
        res.status(200).json(subject);
    } else {
        throw new Error("Subject not found");
    }
})

const getSectionDetails = asyncHandler(async (req, res) => {
    const { id } = req.body

    const section = await Section.findById(id)

    if (section) {
        res.status(200).json(section)
    } else {
        throw new Error("Section not found");
    }
})

const attachFileToSection = asyncHandler(async (req, res) => {
    const { sectionID, attachedFile } = req.body

    const section = await Section.findById(sectionID)

    try {
        section.files.push({
            name: attachedFile
        })

        await section.save()
        res.status(201).json(section)
    } catch (error) {
        console.log(error)
    }
})

const deleteSubjectFile = asyncHandler(async (req, res) => {
    const { 
        id
    } = req.body

   try {
        await Subject.updateMany(
            {},
            {
                $pull: {
                    files: {
                        _id: {
                            $in: id,
                        },
                    }
                },
            }
        );
        res.status(204).send("Delete subject file successfully!")
   } catch(error) {
        console.log(error)
        res.status(404)
        throw new Error("Subject file not found")
   }
});

const deleteSectionFile = asyncHandler(async (req, res) => {
    const { 
        id
    } = req.body

   try {
        await Section.updateMany(
            {},
            {
                $pull: {
                    files: {
                        _id: {
                            $in: id,
                        },
                    }
                },
            }
        );
        res.status(204).send("Delete section file successfully!")
   } catch(error) {
        console.log(error)
        res.status(404)
        throw new Error("Section file not found")
   }
});

const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find().select("-password");
    res.status(200).json(students);
});

const getTeacherConversations = asyncHandler(async(req, res) => {
    const teacherID = req.user._id;

    const conversations = await Conversation.find({
        participants: { $in: teacherID }
    });

    const participants = conversations.map((conversation) => conversation.participants);
    const students = await User.find({
        _id: { $in: participants.flat() },
        accountType: "student"
    }).sort({ updatedAt: -1 }).select("-password");

    res.status(200).json(students);
})

export {
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
}