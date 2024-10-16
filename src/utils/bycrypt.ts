import bcrypt from 'bcryptjs'

const salt = 10
export const passwordHash = async (password: string) => {
    const encryptPassword = await bcrypt.hash(password, salt)
    return encryptPassword
}