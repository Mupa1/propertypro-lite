import database from '../src/models';

class UserService {
  static async signUp(newUser) {
    try {
      return await database.User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const theUser = await database.User.findOne({
        where: { email: email }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const theUser = await database.User.findOne({
        where: { id: Number(id) }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }
}


export default UserService;
