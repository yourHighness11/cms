import bcrypt from 'bcryptjs'

// hash password
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// verify password
export async function verifyPassword(passwordAttempt, hashedPassword) {
    return await bcrypt.compare(passwordAttempt, hashedPassword);
}