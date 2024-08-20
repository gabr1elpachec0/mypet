import jwt from 'jsonwebtoken'

export function generateJWTToken(userId) {
  const payload = { userId }

  const secret = process.env.SECRET

  const token = jwt.sign(payload, secret, { expiresIn: '24h' })

  return token
}