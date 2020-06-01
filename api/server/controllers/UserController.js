import jwt from 'jsonwebtoken';
import UserService from '../services/UserService';
import Util from '../utils/Utils';
import AuthHelper from '../helpers/AuthHelper';

const util = new Util();
const { hashPassword, comparePassword } = AuthHelper;

class UserController {
  static async signUp(req, res) {
    const { email, first_name, last_name, address, phone_number, password, is_admin } = req.body;
    const hashedPassword = hashPassword(password);
    const theUser = await UserService.getUserByEmail(email);
    if (!email || !first_name || !last_name || !address || !phone_number || !password || !is_admin) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    } else if (theUser){
      util.setError(400, `The email ${email} is already in use`);
      return util.send(res);
    }
    req.body.password = hashedPassword;
    const newUser = req.body;
    try {
      let createdUser = await UserService.signUp(newUser);
      const id = await UserService.getUserById(createdUser.id);
      const token = jwt.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: '24h' });
      createdUser = Object.assign({ token }, req.body);
      createdUser.password = undefined;
      util.setSuccess(201, 'User Added!', createdUser);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    const theUser = await UserService.getUserByEmail(email);
    if (!theUser){
      util.setError(400, `The email ${email} does not exist. Please register first.`);
      return util.send(res);
    }
    try {
      const checkPass =  comparePassword(password, theUser.password);
      if (!checkPass) {
        util.setError(400, `Invalid email or password.`);
        return util.send(res);
      } else {
        const token = jwt.sign({ id: theUser.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
        const userData = Object.assign({ token }, req.body);
        userData.password = undefined;
        util.setSuccess(201, `Welcome, ${theUser.first_name} ${theUser.last_name}!`, userData);
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default UserController;
