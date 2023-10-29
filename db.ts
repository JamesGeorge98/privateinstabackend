import { Pool, QueryResult } from 'pg';

interface ModelAttributes {
    [key: string]: string;
}

interface Model {
    tableName: string;
    attributes: ModelAttributes;
}

interface SelectOptions {
    attributes?: string[];
    where?: string;
}

const pool = new Pool(
    {
        user: "postgres",
        host: "localhost",
        database: "pi",
        password: "suntvktv",
        port: 5432,
    }
)

class PIORM {

    private pool: Pool;

    [key: string]: any;

   
    constructor() {
        this.pool = pool  
    }

    defineModel(tableName: string, attributes: ModelAttributes) {
        this[tableName] = { tableName, attributes } as Model; 
      }

    async select(model: Model, options: SelectOptions = {}): Promise<QueryResult> {
        const attributes = options.attributes || Object.keys(model.attributes);
        const where = options.where ? `WHERE ${options.where}` : '';
        const query = `SELECT ${attributes.join(', ')} FROM ${model.tableName} ${where}`;
        console.log(query);
        return await this.pool.query(query);
    }


    async insert(model: Model, data: any): Promise<QueryResult> {
        const attributes = Object.keys(data);
        const values = attributes.map(attribute => `'${data[attribute]}'`);
        const query = `INSERT INTO ${model.tableName} (${attributes.join(', ')}) VALUES (${values.join(', ')})`;
        return await this.pool.query(query);
    }

    async update(model: Model, data: any, options: SelectOptions = {}): Promise<QueryResult> {
        const attributes = Object.keys(data);
        const values = attributes.map(attribute => `${attribute} = '${data[attribute]}'`);
        const where = options.where ? `WHERE ${options.where}` : '';
        const query = `UPDATE ${model.tableName} SET ${values.join(', ')} ${where}`;
        return await this.pool.query(query);
    }

    async delete(model: Model, options: SelectOptions = {}): Promise<QueryResult> {
        const where = options.where ? `WHERE ${options.where}` : '';
        const query = `DELETE FROM ${model.tableName} ${where}`;
        return await this.pool.query(query);
    }
}


export  { PIORM , pool } 


// // Usage Example
// const orm = new PIORM();

// // Define a model 'User' with attributes
// orm.defineModel('User', {
//     id: 'serial primary key',
//     name: 'varchar(100)',
//     // ... other attributes
// });

// // Use the ORM methods to interact with the 'User' model
// (async () => {
//     const users = await orm.select(orm['User'], { /* options */ });
//     // Perform other CRUD operations
// })();