import mongoose from 'mongoose'

const sectionsSchema = mongoose.Schema(
    {
        level: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Level'
        },
        section: {
            type: String,
            required: true,
            unique: true
        },
        adviser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Teacher'
        },
        students: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: false,
                    ref: 'Student'
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
                    required: false
                },
                email: {
                    type: String,
                    required: false,
                },
                image: {
                    type: String,
                    required: false,
                },
                address: {
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
                }
            }
        ],
        subjects: [
            {
                subject: {
                    type: String,
                    required: false
                },
                subjectID: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: false,
                    ref: 'Subject'
                }
            }
        ],
        files: [
            {
                name: {
                    type: String,
                    required: false
                }
            }
        ]
    },
    {
        timestamps: true,
    }
)

const Section = mongoose.model('Section', sectionsSchema)

export default Section