import mongoose from 'mongoose'

const subjectsSchema = mongoose.Schema(
    {
        subject: {
            type: String,
            required: true
        },
        section: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Section'
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Teacher'
        },
        files: [
           {
                file: {
                    type: String,
                    required: false
                }
           }
        ],
        yt_links: [
            {
                link: {
                    type: String,
                    required: false
                }
            }
        ],
        schedules: [
            {
                day: {
                    type: String,
                    required: false
                },
                startTime: {
                    type: String,
                    required: false
                },
                endTime: {
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

const Subject = mongoose.model('Subject', subjectsSchema)

export default Subject