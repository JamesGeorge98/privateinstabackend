const Pool = require('pg').Pool;

const pool = new Pool(
    {
        user:"postgres",
        host:"localhost",
        database:"pi",
        password:"suntvktv",
        port:5432,
    }
)

module.exports = pool;