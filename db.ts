import { Pool } from 'pg';

const pool = new Pool(
    {
        user:"postgres",
        host:"localhost",
        database:"pi",
        password:"suntvktv",
        port:5432,
    }
)

export default pool;