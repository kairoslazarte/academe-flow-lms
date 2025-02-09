import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import admins from './data/admins.js'
import Student from './models/studentsModel.js'
import Teacher from './models/teachersModel.js'
import Admin from './models/adminsModel.js'
import Level from './models/levelsModel.js'
import connectDB from './config/db.js'
import NewsUpdates from './models/newsUpdatesModel.js'
import NewsletterMemos from './models/newsletterModel.js'
import Subject from './models/subjectsModel.js'
import Section from './models/sectionsModel.js'
import Category from './models/categoriesModel.js'
import User from './models/userModel.js'
import users from './data/users.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Admin.deleteMany()
    await User.deleteMany()

    await Admin.insertMany(admins)
    await User.insertMany(users)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Admin.deleteMany()
    await Teacher.deleteMany()
    await Student.deleteMany()
    await Category.deleteMany()
    await Level.deleteMany()
    await Section.deleteMany()
    await Subject.deleteMany()
    await NewsUpdates.deleteMany()
    await NewsletterMemos.deleteMany()


    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
