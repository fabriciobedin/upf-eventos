export default {
  secret: process.env.APP_SECRET,
  salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  expiresIn: '7d',
};
