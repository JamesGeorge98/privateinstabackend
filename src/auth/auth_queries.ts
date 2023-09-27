const allUser = 'SELECT * FROM insta_users';

const findOneUserName = 'SELECT user_name from insta_users WHERE user_name';

const createUser = `
  INSERT INTO insta_users (user_name, first_name, last_name, email, phone_number,password)
  VALUES ($1, $2, $3, $4 ,$5,$6)
  RETURNING *
`;

const signIn = `SELECT * FROM insta_users WHERE phone_number = $1 OR user_name = $1 OR email = $1 `;


export default {
    allUser, findOneUserName, createUser ,signIn
}