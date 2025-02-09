import bcrypt from 'bcryptjs'

const mralAdmins = [
    {
        first_name: 'System',
        middle_name: 'Admin',
        last_name: 'MRAL',
        email: 'mral-system_admin@mral.com',
        password: bcrypt.hashSync('@mralAdmin#2023!Jeremiah29:11', 10),
        phone: '09063475153',
    },
]

export default mralAdmins