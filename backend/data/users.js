import bcrypt from 'bcryptjs'

const users = [
    {
        full_name: 'System Admin',
        email: 'lms_admin@lms.com',
        password: bcrypt.hashSync('lms-playground-test@2024', 10),
        accountType: 'admin',
    },
]

export default users