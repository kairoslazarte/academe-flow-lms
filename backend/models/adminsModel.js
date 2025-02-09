import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminsModel = mongoose.Schema(
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
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        }
    }, {timestamps: true}
)

adminsModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
  adminsModel.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const Admin = mongoose.model('Admin', adminsModel)

export default Admin