import mongoose from 'mongoose'

const newsletterMemosSchema = mongoose.Schema(
    {
        file: {
            type: String,
            required: false
        },
        link: {
            type: String, 
            required: false
        }
    },
    {
        timestamps: true,
    }
)

const NewsletterMemos = mongoose.model('NewsletterMemos', newsletterMemosSchema)

export default NewsletterMemos