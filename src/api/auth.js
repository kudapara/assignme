import bcrypt from 'bcryptjs'

/**
 * Hash the password for secure storage in the database 
 */
export function hashedPassword (password) {
  return bcrypt.hashSync(password, 10)
}

/**
* Checks if the password provided by the user matches the password
* in the database
*/
export function comparePasswords (reqPass, dbPass) {
  return bcrypt.compareSync(reqPass, dbPass)
}
