import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Admin from "../models/adminsModel.js";
import Teacher from "../models/teachersModel.js";
import Level from "../models/levelsModel.js";
import Category from "../models/categoriesModel.js";
import Section from "../models/sectionsModel.js";
import Subject from "../models/subjectsModel.js";
import Student from "../models/studentsModel.js";
import NewsUpdates from "../models/newsUpdatesModel.js";
import NewsletterMemos from "../models/newsletterModel.js";
import User from "../models/userModel.js";

const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        const updatedAdmin = await admin.save();

        res.json({
            _id: updatedAdmin._id,
            first_name: updatedAdmin.first_name,
            middle_name: updatedAdmin.middle_name,
            last_name: updatedAdmin.last_name,
            phone: updatedAdmin.phone,
            email: updatedAdmin.email
        });
        res.status(200);
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const createTeacherAccount = asyncHandler(async (req, res) => {
    const {
        first_name,
        middle_name,
        last_name,
        phone,
        email,
        password,
        image,
        birthdate,
        address,
        zoom_id,
        zoom_link,
        zoom_password
    } = req.body;

    const oldTeacher = await Teacher.findOne({ email });

    if (oldTeacher) {
        res.status(400);
        throw new Error("Email already exists");
    }

    const teacher = new Teacher({
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        full_name: !middle_name ? `${first_name} ${last_name}` : `${first_name} ${middle_name} ${last_name}`,
        phone: phone,
        email: email,
        password: password,
        image: image,
        birthdate: birthdate,
        address: address,
        zoom_link: zoom_link,
        zoom_id: zoom_id,
        zoom_password: zoom_password
    });

    const newTeacher = await teacher.save();

    const newUser = new User({
        _id: newTeacher._id,
        full_name: !newTeacher.middle_name ? `${newTeacher.first_name} ${newTeacher.last_name}` : `${newTeacher.first_name} ${newTeacher.middle_name} ${newTeacher.last_name}`,
        email: newTeacher.email,
        password: newTeacher.password,
        accountType: "teacher"
    })

    generateToken(newUser._id, res);
    await newUser.save();
    res.status(201).json(newTeacher);
});

const getAllTeachers = asyncHandler(async (req, res) => {
    const teachers = await Teacher.find().select("-password");
    res.status(200).json(teachers);
});

const createCategory = asyncHandler(async (req, res) => {
    const { category } = req.body;

    const existingCategory = await Category.findOne({ category: category });

    if (existingCategory) {
        existingCategory.category = category;
        await existingCategory.save();
        res.status(201).json(existingCategory);
    } else {
        const createdCategory = new Category({
            category: category,
        });

        const newCategory = await createdCategory.save();
        res.status(201).json(newCategory);
    }
});

const getAllClassCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    res.status(200).json(categories);
});

const createLevel = asyncHandler(async (req, res) => {
    const { category, level } = req.body;

    const existingLevel = await Level.findOne({ level: level });

    if (existingLevel) {
        existingLevel.level = level;
        existingLevel.category = category;
        await existingLevel.save();
        res.status(201).json(existingLevel);
    } else {
        const createdLevel = new Level({
            category: category,
            level: level,
        });

        const newLevel = await createdLevel.save();
        const currentCategory = await Category.findOne({ _id: category });
        currentCategory.levels.push({
            level: newLevel.level,
            levelID: newLevel._id,
        });
        await currentCategory.save();
        res.status(201).json(newLevel);
    }
});

const getAllLevels = asyncHandler(async (req, res) => {
    const { category } = req.body;

    const levels = await Level.find({ category: category });

    res.status(200).json(levels);
});

const getLevel = asyncHandler(async (req, res) => {
    const { levelID } = req.body;

    const sections = await Section.find({ level: levelID });

    const teachers = await Teacher.find({
        _id: sections.map((sec) => sec.adviser),
    });

    res.status(200).send({
        sections: sections,
        teachers: teachers,
    });
});

const createSection = asyncHandler(async (req, res) => {
    const { level, section, adviser, student } = req.body;

    const existingSection = await Section.findOne({ section: section });

    if (existingSection) {
        existingSection.section = section;
        existingSection.level = level;
        await existingSection.save();
        res.status(201).json(existingSection);
    } else {
        const createdSection = new Section({
            level: level,
            section: section,
            adviser: adviser,
        });
        // console.log(createdSection)
        // createdSection.students.push(student)

        const newSection = await createdSection.save();
        const updatedAdviser = await Teacher.findById(adviser);
        updatedAdviser.advisoryClass.push({
            section: newSection.section,
            sectionID: newSection._id,
        });
        const updatedLevel = await Level.findById(level);
        updatedLevel.sections.push({
            section: newSection.section,
            sectionID: newSection._id,
        });
        await updatedLevel.save();
        await updatedAdviser.save();
        res.status(201).json(newSection);
    }
});

const getAllSections = asyncHandler(async (req, res) => {
    const { levelID } = req.body;

    const sections = await Section.find({ level: levelID });

    res.status(200).json(sections);
});

const createSubject = asyncHandler(async (req, res) => {
    const { subject, teacher, section } = req.body;

    const createdSection = await Section.findById(section);

    let existingSubject = createdSection.subjects.find(
        (subjects) => subjects.subject === subject
    );

    if (existingSubject) {
        res.status(400);
        throw new Error("Subject already exists");
    } else {
        const createdSubject = new Subject({
            subject: subject,
            section: section,
            teacher: teacher,
        });

        const newSubject = await createdSubject.save();
        const updatedSection = await Section.findById(section);
        const updatedTeacher = await Teacher.findById(teacher);
        updatedSection.subjects.push({
            subject: subject,
            subjectID: newSubject._id,
        });
        updatedTeacher.classes.push({
            subject: subject,
            subjectID: newSubject._id,
        });
        await updatedSection.save();
        await updatedTeacher.save();
        res.status(201).json(newSubject);
    }
});

const getAllSubjects = asyncHandler(async (req, res) => {
    const subjects = await Subject.find();

    res.status(200).json(subjects);
});

const createSchedule = asyncHandler(async (req, res) => {
    const { subject, day, startTime, endTime } = req.body;

    const currentSubject = await Subject.findById(subject);

    if (currentSubject) {
        currentSubject.schedules.push({
            day: day,
            startTime: startTime,
            endTime: endTime,
        });
        await currentSubject.save();
        res.status(201).json(currentSubject);
    } else {
        res.status(404);
        throw new Error("Cannot find subject");
    }
});

const deleteTeachers = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    try {
        await Teacher.deleteMany({
            _id: { $in: ids },
        });
        await User.deleteMany({
            _id: { $in: ids },
        })
        res.status(204).send("Delete Teacher/s successfully.");
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Teacher/s not found.");
    }
});

const deleteAllClasses = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    const levels = await Level.find({
        category: { $in: ids },
    });
    const sections = await Section.find({
        level: { $in: levels.map((level) => level._id) },
    });

    const subjects = await Subject.find({
        section: { $in: sections.map((section) => section._id) },
    });

    try {
        await Category.deleteMany({
            _id: { $in: ids },
        });
        await Level.deleteMany({
            category: { $in: ids },
        });
        await Section.deleteMany({
            level: { $in: levels.map((level) => level._id) },
        });
        await Subject.deleteMany({
            section: { $in: sections.map((section) => section._id) },
        });
        await Student.updateMany(
            { categoryID: { $in: ids } },
            {
                $unset: {
                    category: 1,
                    categoryID: 1,
                    level: 1,
                    levelID: 1,
                    section: 1,
                    sectionID: 1,
                },
            }
        );
        await Teacher.updateMany(
            {},
            {
                $pull: {
                    advisoryClass: {
                        sectionID: {
                            $in: sections.map((section) => section._id),
                        },
                    },
                    classes: {
                        subjectID: {
                            $in: subjects.map((subject) => subject._id),
                        },
                    },
                },
            }
        );

        res.status(204).send("Delete Class/es successfully.");
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Class/es not found.");
    }
});

const getTeacherDetails = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const teacher = await Teacher.findById(id);

    if (teacher) {
        res.status(200).json(teacher);
    } else {
        res.status(404);
        throw new Error("Teacher not found");
    }
});

const createStudentAccount = asyncHandler(async (req, res) => {
    const {
        first_name,
        middle_name,
        last_name,
        email,
        address,
        password,
        image,
        parent_fName,
        parent_mName,
        parent_lName,
        parent_email,
        phone,
        relationship,
        categoryID,
        levelID,
        sectionID,
        birthdate
    } = req.body;

    const existingStudent = await Student.findOne({ email });

    const level = await Level.findById(levelID);
    const section = await Section.findById(sectionID);
    const category = await Category.findById(categoryID);

    if (existingStudent) {
        res.status(400);
        throw new Error("Student email already exists");
    }

    const student = new Student({
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        full_name: !middle_name ? `${first_name} ${last_name}` : `${first_name} ${middle_name} ${last_name}`,
        email: email,
        address: address,
        password: password,
        image: image,
        categoryID: categoryID,
        levelID: levelID,
        sectionID: sectionID,
        level: level.level,
        section: section.section,
        category: category.category,
        birthdate: birthdate,
        parent_guardian: {
            relationship: relationship,
            first_name: parent_fName,
            middle_name: parent_mName,
            last_name: parent_lName,
            email: parent_email,
            phone_number: phone,
        },
    });

    const newStudent = await student.save();
    const currentSection = await Section.findById(sectionID);
    currentSection.students.push({
        _id: newStudent._id,
        image: newStudent.image,
        first_name: newStudent.first_name,
        middle_name: newStudent.middle_name,
        last_name: newStudent.last_name,
        email: newStudent.email,
        address: newStudent.address,
        birthdate: newStudent.birthdate,
        parent_guardian: {
            relationship: relationship,
            first_name: parent_fName,
            middle_name: parent_mName,
            last_name: parent_lName,
            email: parent_email,
            phone_number: phone,
        },
    });

    const newUser = new User({
        _id: newStudent._id,
        full_name: !newStudent.middle_name ? `${newStudent.first_name} ${newStudent.last_name}` : `${newStudent.first_name} ${newStudent.middle_name} ${newStudent.last_name}`,
        email: newStudent.email,
        password: newStudent.password,
        accountType: "student"
    })

    generateToken(newUser._id, res);
    await newUser.save();
    await currentSection.save();
    res.status(201).json(newStudent);
});

const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find().select("-password");
    res.status(200).json(students);
});

const searchStudents = asyncHandler(async (req, res) => {
    const { searchInput } = req.body;

    const keyword = searchInput 
    ? {
        full_name:  {
            $regex: searchInput,
            $options: 'i',
        },
    } : {}
    
    const students = await Student.find({ ...keyword })
    res.json(students)
})

const deleteStudents = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    try {
        await Student.deleteMany({
            _id: { $in: ids },
        });
        await Section.updateMany(
            {},
            {
                $pull: {
                    students: {
                        _id: { $in: ids },
                    },
                },
            }
        );
        await User.deleteMany({
            _id: { $in: ids },
        })
        res.status(204).send("Delete Student/s successfully.");
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Student/s not found.");
    }
});

const deleteSections = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    const sections = await Section.find({ _id: { $in: ids } });

    const subjects = await Subject.find({
        section: { $in: sections.map((section) => section._id) },
    });
    // delete in levels
    // delete in students
    // delete in subjects
    // delete in teachers advisory class and also classes if there is

    try {
        await Level.updateMany(
            {},
            {
                $pull: {
                    sections: {
                        sectionID: { $in: ids },
                    },
                },
            }
        );
        await Student.updateMany(
            {
                sectionID: { $in: ids },
            },
            {
                $unset: {
                    section: 1,
                    sectionID: 1,
                },
            }
        );
        await Subject.deleteMany({
            section: { $in: ids },
        });
        await Section.deleteMany({
            _id: { $in: ids },
        });
        await Teacher.updateMany(
            {},
            {
                $pull: {
                    advisoryClass: {
                        sectionID: { $in: ids },
                    },
                    classes: {
                        subjectID: {
                            $in: subjects.map((subject) => subject._id),
                        },
                    },
                },
            }
        );

        res.status(204).send("Delete Level/s successfully.");
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Level/s not found.");
    }
});

const getSection = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const section = await Section.findById(id);

    const teacher = await Teacher.findById(section.adviser);

    const level = await Level.findById(section.level);

    if (section) {
        res.status(200).send(({
            section: section,
            teacher: teacher,
            level: level
        }));
    } else {
        res.status(404);
        throw new Error("Section not found.");
    }
});

const updateStudentAccount = asyncHandler(async (req, res) => {
    const {
        id,
        first_name,
        middle_name,
        last_name,
        email,
        address,
        image,
        parent_fName,
        parent_mName,
        parent_lName,
        parent_email,
        phone,
        relationship,
        categoryID,
        levelID,
        sectionID,
        birthdate
    } = req.body;

    
    const level = await Level.findById(levelID);
    const section = await Section.findById(sectionID);
    const category = await Category.findById(categoryID);
    
    const student = await Student.findOneAndUpdate(
        {
            '_id': id
        },
        {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            full_name: !middle_name ? `${first_name} ${last_name}` : `${first_name} ${middle_name} ${last_name}`,
            email: email,
            address: address,
            image: image,
            categoryID: categoryID,
            levelID: levelID,
            sectionID: sectionID,
            level: level.level,
            section: section.section,
            category: category.category,
            birthdate: birthdate,
            parent_guardian: {
                relationship: relationship,
                first_name: parent_fName,
                middle_name: parent_mName,
                last_name: parent_lName,
                email: parent_email,
                phone_number: phone,
            },
        }
    )
    
    await Section.updateMany(
        {},
        {
            $pull: {
                students: {
                    _id: {
                        $in: id,
                    },
                },
            },
        }
    );

    section.students.push({
        _id: id,
        image: image,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        email: email,
        address: address,
        birthdate: birthdate,
        parent_guardian: {
            relationship: relationship,
            first_name: parent_fName,
            middle_name: parent_mName,
            last_name: parent_lName,
            email: parent_email,
            phone_number: phone,
        },
    });

    await student.save();
    await section.save();
    res.status(200).json(student)
});

const removeStudentFromSection = asyncHandler(async (req, res) => {
    const { 
        studentID,
        sectionID
    } = req.body

    try {
        await Section.updateOne(
            { '_id': sectionID },
            {
                $pull: {
                    students: {
                        _id: {
                            $in: studentID,
                        },
                    },
                },
            }
        );
    
        await Student.updateOne(
            { '_id': studentID },
            {
                $unset: {
                    section: 1,
                    sectionID: 1
                },
            }
        )
    
        res.status(204).send("Remove student from section successfully.");
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Class/es not found.");
    }
});

const removeSubjectFromSection = asyncHandler(async (req, res) => {
    const { id } = req.body

    try {
        const subject = await Subject.findById(id)

        await Section.updateMany(
            {},
            {
                $pull: {
                    subjects: {
                        subjectID: {
                            $in: id,
                        },
                    },
                },
            }
        );
    
        await Teacher.updateMany(
            {},
            {
                $pull: {
                    classes: {
                        subjectID: {
                            $in: id,
                        },
                    },
                },
            }
        )
        
        await subject.remove();
        res.status(204).send("Remove subject from section successfully.");
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Class/es not found.");
    }
});

const createNewAndUpdates = asyncHandler(async (req, res) => {
    const {
        image,
        text
    } = req.body

    const newsUpdates = new NewsUpdates({
        image: image,
        text: text,
    });

    const createdNewsUpdates = await newsUpdates.save();
    res.status(201).json(createdNewsUpdates);
});

const editNewsAndUpdates = asyncHandler(async (req, res) => {
    const {
        id,
        image,
        text
    } = req.body;
    
    const newsUpdates = await NewsUpdates.findOneAndUpdate(
        {
            '_id': id
        },
        {
            image: image,
            text: text,
        }
    )
    
    await newsUpdates.save()
    res.status(200).json(newsUpdates)
});


const getNewsAndUpdates = asyncHandler(async (req, res) => {
    const newsUpdates = await NewsUpdates.find().sort({ updatedAt: -1 })

    res.status(200).json(newsUpdates)
});

const addStudentInSection = asyncHandler(async (req, res) => {
    const {
        studentID,
        sectionID
    } = req.body

    const student = await Student.findById(studentID)
    const section = await Section.findById(sectionID)

    const existingStudent = await Section.findOne({
        students: { _id: studentID }
    })

    if (existingStudent) {
        res.status(400);
        throw new Error("Student email already exists");
    } else {
        section.students.push({
            _id: student._id,
            image: student.image,
            first_name: student.first_name,
            middle_name: student.middle_name,
            last_name: student.last_name,
            email: student.email,
            address: student.address,
            birthdate: student.birthdate,
            parent_guardian: {
                relationship: student.parent_guardian.relationship,
                first_name: student.parent_guardian.first_name,
                middle_name: student.parent_guardian.middle_name,
                last_name: student.parent_guardian.last_name,
                email: student.parent_guardian.email,
                phone_number: student.parent_guardian.phone_number,
            },
        });

        await Student.updateOne(
            { '_id': studentID },
            {
                $set: {
                    section: section.section,
                    sectionID: section._id
                },
            }
        )

        await section.save();
        res.status(201).json(section)
    }
});

const addSubjectInSection = asyncHandler(async (req, res) => {
    const {
        subjectName,
        subjectTeacher,
        sectionID
    } = req.body

    const section = await Section.findById(sectionID)
    const teacher = await Teacher.findById(subjectTeacher)

    try {
        const createSubject = new Subject({
            subject: subjectName,
            section: sectionID,
            teacher: subjectTeacher
        });
    
        const newSubject = await createSubject.save()
    
        section.subjects.push({
            subject: newSubject.subject,
            subjectID: newSubject._id,
        });
    
        teacher.classes.push({
            subject: newSubject.subject,
            subjectID: newSubject._id,
        });
    
        await section.save()
        await teacher.save()
        res.status(201).json(section)
    } catch (error) {
        console.log(error)
    }
});

const updateSection = asyncHandler(async (req, res) => {
    const {
        sectionID,
        section,
        adviser
    } = req.body;

    const teacher = await Teacher.findById(adviser)

    try {
        await Section.updateOne(
            { '_id': sectionID },
            {
                $set: {
                    section: section,
                    adviser: adviser
                },
            }
        )

        await Teacher.updateMany(
            {},
            {
                $pull: {
                    advisoryClass: {
                        sectionID: {
                            $in: [sectionID],
                        },
                    },
                },
            }
        )

        teacher.advisoryClass.push({
            section: section,
            sectionID: sectionID
        })

        await teacher.save()
        res.status(201).json(teacher)
    } catch (error) {
        console.log(error)
    } 
});

const getSubject = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const subject = await Subject.findById(id);

    if (subject) {
        res.status(200).json(subject)
    } else {
        res.status(404);
        throw new Error("Subject not found.");
    }
});

const addSubjectSchedule = asyncHandler(async (req, res) => {
    const {
        subjectID,
        day,
        startTime,
        endTime
    } = req.body

    const subject = await Subject.findById(subjectID)

    try {
        subject.schedules.push({
            day: day,
            startTime: startTime,
            endTime: endTime
        })

        await subject.save();
        res.status(200).send('Added schedule for subject successfully!')
    } catch (error) {   
        console.log(error)
    }
});

const deleteSubjectSchedule = asyncHandler(async (req, res) => {
    const {
        scheduleID
    } = req.body

    try {
        await Subject.updateMany(
            {},
            {
                $pull: {
                    schedules: {
                        _id: {
                            $in: [scheduleID],
                        },
                    },
                },
            }
        )

        res.status(200).send("Delete subject schedule successfully!")
    } catch (error) {
        console.log(error)
    }
});

const updateSubjectTeacher = asyncHandler(async (req, res) => {
    const {
        teacher,
        subject,
        subjectID,
    } = req.body

    const selectedTeacher = await Teacher.findById(teacher)

    try {
        await Subject.updateOne(
            { '_id': subjectID },
            {
                teacher: teacher
            }
        )

        await Teacher.updateMany(
            {},
            {
                $pull: {
                    classes: {
                        subjectID: {
                            $in: [subjectID],
                        },
                    },
                },
            }
        )

        selectedTeacher.classes.push({
            subject: subject,
            subjectID: subjectID
        })
    
        await selectedTeacher.save()
        res.status(200).send("Update teacher for subject successfully!")
    } catch (error) {
        console.log(error)
    }
});

const updateTeacherAccount = asyncHandler(async (req, res) => {
    const {
        id,
        first_name,
        middle_name,
        last_name,
        phone,
        email,
        image,
        birthdate,
        address,
        zoom_id,
        zoom_link,
        zoom_password
    } = req.body;
    
    const teacher = await Teacher.findOneAndUpdate(
        {
            '_id': id
        },
        {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            full_name: !middle_name ? `${first_name} ${last_name}` : `${first_name} ${middle_name} ${last_name}`,
            email: email,
            address: address,
            image: image,
            birthdate: birthdate,
            phone: phone,
            zoom_id: zoom_id,
            zoom_link: zoom_link,
            zoom_password: zoom_password
        }
    )

    const user = await User.findOneAndUpdate(
        {
            '_id': id
        },
        {
            full_name: !middle_name ? `${first_name} ${last_name}` : `${first_name} ${middle_name} ${last_name}`,
            email: email
        }
    )
    
    await teacher.save()
    await user.save()
    res.status(200).json(teacher)
});

const uploadNewsletterMemos = asyncHandler(async (req, res) => {
    const { file, link } = req.body

    const createdNewsletterMemo = new NewsletterMemos({
        file: file,
        link: link
    })

    const uploadedNewsletterMemo = await createdNewsletterMemo.save()
    res.status(201).json(uploadedNewsletterMemo)
})

const getNewslettersMemos = asyncHandler(async (req, res) => {
    const newslettersmemos = await NewsletterMemos.find()

    res.status(200).json(newslettersmemos)
})

const deleteNewsletter = asyncHandler(async (req, res) => {
    const { 
        newsletterID
    } = req.body

    const newsletter = await NewsletterMemos.findById(newsletterID)

    if(newsletter) {
        await newsletter.remove();
        res.status(202).send("Deleted newsletter successfully!")
    } else {
        res.status(404);
        throw new Error("Newsletter not found.");
    }
});

const deleteNewsAndUpdates = asyncHandler(async (req, res) => {
    const { 
        id
    } = req.body

    const newsUpdates = await NewsUpdates.findById(id)

    if(newsUpdates) {
        await newsUpdates.remove();
        res.status(202).send("Deleted news and updates successfully!")
    } else {
        res.status(404);
        throw new Error("News and updates not found.");
    }
});

export {
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
    getAllSubjects,
    createSubject,
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
};
