const { client } = require('./index');
const bcrypt = require('bcrypt');

// database functions
// user functions
async function createUser({ email, password, shippingAddress, phoneNumber, isAdmin }) { // isAdmin might need later
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const { rows: [user] } = await client.query(`
    INSERT INTO users( email, password, shippingAddress, phoneNumber, "isAdmin") 
    VALUES($1, $2, $3, $4, $5) 
    ON CONFLICT (username) DO NOTHING 
    RETURNING *;
  `, [ email, hashedPassword, shippingAddress, phoneNumber, isAdmin]);
    if (hashedPassword) {
      delete user.password
      return user;
    }
    return user;
  } catch (err) {
    console.log('createUser-users.js FAILED', err)
  }
}

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [user] } = await client.query(`
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields));

    return user;
  } catch (err) {
    console.log('updateUser-users.js FAILED', err)
  }
}

async function getUser({ email, password }) {

  const user = await getUserByEmail(email);
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

  if (passwordsMatch) {
    // return the user object (without the password)
    delete user.password
    return user
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, email, password, shippingAddress, phoneNumber, "isAdmin"
      FROM users;
    `);

    return rows;
  } catch (err) {
    console.log('getAllUsers-users.js FAILED', err)
  }
}

async function getUserByEmail(userId) {

  const { rows: [user] } = await client.query(`
      SELECT id, email, "isAdmin"
      FROM users
      WHERE id=${userId}
    `);

  if (!user) {
    return null
  }

  return user;

}



module.exports = {
  createUser,
  updateUser,
  getUser,
  getUserByEmail,
  getAllUsers
}