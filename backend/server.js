import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import adminsRoutes from './routes/adminsRoutes.js';
import teachersRoutes from './routes/teachersRoutes.js';
import studentsRoutes from './routes/studentsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'
import uploadSubjectFilesRoutes from './routes/uploadSubjectFilesRoutes.js'
import uploadSectionFilesRoutes from './routes/uploadSectionFilesRoutes.js'
import uploadNewsletterRoutes from './routes/uploadNewsletterRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import cors from 'cors'
import { app, server } from './socket/socket.js'

dotenv.config()

connectDB()

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/admins', adminsRoutes)
app.use('/api/teachers', teachersRoutes)
app.use('/api/students', studentsRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/subjectUpload', uploadSubjectFilesRoutes)
app.use('/api/sectionUpload', uploadSectionFilesRoutes)
app.use('/api/newsletterUpload', uploadNewsletterRoutes)
app.use('/api/messages', messageRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

console.log(__dirname)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

app.use(notFound)
app.use(errorHandler)

server.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
)