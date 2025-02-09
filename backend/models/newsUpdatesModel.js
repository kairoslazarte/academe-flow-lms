import mongoose from 'mongoose'

const newsUpdatesSchema = mongoose.Schema(
    {
        image: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

const NewsUpdates = mongoose.model('NewsUpdates', newsUpdatesSchema)

export default NewsUpdates