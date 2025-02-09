import mongoose from 'mongoose'

const levelsSchema = mongoose.Schema(
    {
        level: {
            type: String,
            required: false,
            unique: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Category'
        },
        sections: [
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
        ]
    },
    {
        timestamps: true,
    }
)

const Level = mongoose.model('Level', levelsSchema)

export default Level