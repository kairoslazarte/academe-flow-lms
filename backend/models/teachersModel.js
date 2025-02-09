import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const teachersSchema = mongoose.Schema(
    {
        image_url: {
            type: String,
            required: false
        },
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
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        phone: {
            type: Number,
            required: true,
            default: '0987654321'
        },
        birthdate: {
            type: Date,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        zoom_link : {
            type: String,
            required: false
        },
        zoom_id: {
            type: String,
            required: false
        },
        zoom_password: {
            type: String,
            required: false
        },
        advisoryClass: [
            {
               section: {
                    type: String,
                    required: false,
               },
               sectionID: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: false,
                    ref: 'Section'
               }
            }
        ],
        classes: [
            {
                subject: {
                    type: String,
                    required: false,
                },
                subjectID: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: false,
                    ref: 'Subject'
                }
            }
        ],
        conversations: [
            {
                teacherID: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: false,
                    ref: 'Student'
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
                            ref: 'Teacher'
                        },
                        recipientID: {
                            type: mongoose.Schema.Types.ObjectId,
                            required: false,
                            ref: 'Student'
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
    },
    {
        timestamps: true,
    }
)

teachersSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
  
teachersSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Teacher = mongoose.model('Teacher', teachersSchema)

export default Teacher