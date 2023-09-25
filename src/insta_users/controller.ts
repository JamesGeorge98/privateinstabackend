import pool from '../../db';
import queries from './queries';

const getUsers = (_req : any , res : any) => {
    pool.query(queries.allUser,(error,results)=>{
        if(error){
            console.log(error);
            res.json(200).json("something went wrong");
        }
        res.status(200).json(results.rows);
    });
};


export default {getUsers};
