const allUser = 'SELECT * FROM insta_users';

const findOneUserName = `SELECT * FROM insta_users WHERE user_name like `;

const createUser = `
  INSERT INTO insta_users (user_name, first_name, last_name, email, phone_number,password,created_at,updated_at)
  VALUES ($1, $2, $3, $4 ,$5,$6,$7,$8)
  RETURNING *
`;

const signIn = `SELECT * FROM insta_users WHERE phone_number = $1 OR user_name = $1 OR email = $1 `;


const addToken =
  ` UPDATE insta_users
    SET jwt_token = $1
    WHERE user_name = $2;
  `;

export default {
  allUser, findOneUserName, createUser, signIn, addToken
}