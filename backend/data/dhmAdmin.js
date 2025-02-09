import bcrypt from 'bcryptjs'

const dhmAdmins = [
    {
        first_name: 'System',
        middle_name: 'Admin',
        last_name: 'DHM',
        email: 'dhm-system_admin@dhm.com',
        password: bcrypt.hashSync('@dhmAdmin#2023!Jeremiah29:11', 10),
        phone: '09063475153',
    },
]

export default dhmAdmins