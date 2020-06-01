import bcrypt from 'bcrypt';

const SaltRounds = 8;

class AuthHelper {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SaltRounds));
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

export default AuthHelper;
