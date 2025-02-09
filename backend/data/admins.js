import bcrypt from 'bcryptjs'

const admins = [
    {
        first_name: 'System',
        middle_name: '',
        last_name: 'ADMIN',
        email: 'lms_admin@lms.com',
        password: bcrypt.hashSync('lms-playground-test@2024', 10),
        phone: '09123456789',
    },
]

export default admins