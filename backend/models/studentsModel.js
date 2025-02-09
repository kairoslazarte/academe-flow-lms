import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const studentsSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        middle_name: {
            type: String,
            required: false
        },
        last_name: {
            type: String,
            required: true
        },
        full_name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: false,
        },
        address: {
            type: String, 
            required: false
        },
        password: {
            type: String,
            required: true
        },
        categoryID: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Category'
        },
        levelID: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Level'
        },
        sectionID: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Section'
        },
        level: {
            type: String,
            required: false
        },
        section: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        birthdate: {
            type: Date,
            required: false
        },
        parent_guardian: 
        {
            relationship: {
                type: String,
                required: false
            },
            first_name: {
                type: String,
                required: false
            },
            middle_name: {
                type: String,
                required: false
            },
            last_name: {
                type: String,
                required: false,
            },
            email: {
                type: String,
                required: false,
            },
            phone_number: {
                type: Number,
                required: false
            },
        },
        conversations: [
            {
                teacherID: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: false,
                    ref: 'Teacher'
                },
                name: {
                    type: String,
                    required: false
                },
                messages: [
                    {
                        senderID: {
                            type: mongoose.Schema.Types.ObjectId,
                            required: false,
                            ref: 'Student'
                        },
                        recipientID: {
                            type: mongoose.Schema.Types.ObjectId,
                            required: false,
                            ref: 'Teacher'
                        }, 
                        message: {
                            type: String,
                            required: false
                        }
                    },
                    {
                        timestamps: true,
                    }
                ]
            },
            {
                timestamps: true,
            }
        ]
    }, {timestamps: true}
)

studentsSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
    
studentsSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
    next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const Student = mongoose.model('Student', studentsSchema)

export default Student
