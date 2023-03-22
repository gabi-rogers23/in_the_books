const client = require("./client");
const bcrypt = require("bcrypt");
const { createCart } = require("./dbCart");

// database functions
// user functions
async function createUser({
  email,
  password,
  firstName,
  lastName,
  shippingAddress,
  phoneNumber,
  isAdmin,
}) {
  // isAdmin might need later
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users( email, password, "firstName", "lastName", "shippingAddress", "phoneNumber", "isAdmin") 
    VALUES($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *;
  `,
      [
        email,
        hashedPassword,
        firstName,
        lastName,
        shippingAddress,
        phoneNumber,
        isAdmin,
      ]
    );
        console.log(user)
    if (hashedPassword) {
      delete user.password;
      await createCart(user.id);
      // console.log(user)
      return user;
    }
  } catch (err) {
    console.log("createUser-users.js FAILED", err);
  }
}

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    return user;
  } catch (err) {
    console.log("updateUser-users.js FAILED", err);
  }
}

async function getUser({ email, password }) {
  try {
    const user = await getUserByEmail(email);
    // console.log("User from Get User", user)
    if (!user) {
      return null;
    }

    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordsMatch) {
      // return the user object (without the password)
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT id, email, password, "shippingAddress", "phoneNumber", "isAdmin"
      FROM users;
    `);

    return rows;
  } catch (err) {
    console.log("getAllUsers-users.js FAILED", err);
  }
}

async function getUserByEmail(userEmail) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT *
      FROM users
      WHERE email= '${userEmail}';
    `);
    // console.log("User in getUserByEmail", user);

    if (!user) {
      return null;
    } else {
      return user;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
  SELECT * FROM users WHERE id=${userId}
  `);
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  updateUser,
  getUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
};
