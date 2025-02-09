import mongoose from 'mongoose'

const categoriesSchema = mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            unique: true
        },
        levels: [
            {
                level: {
                    type: String,
                    required: false,
                },
                levelID: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: false,
                    ref: 'Level'
                }
            }
        ]
    },
    {
        timestamps: true,
    }
)

const Category = mongoose.model('Category', categoriesSchema)

export default Category
