import jwt from 'jsonwebtoken'

export function generateJWTToken(userId, userType) {
  const payload = {
    userId,
    userType
  }

  const secret = process.env.SECRET

  const token = jwt.sign(payload, secret, { expiresIn: '1h' })

  return token
}