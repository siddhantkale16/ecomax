import {Db, MongoClient} from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:28017/ecomax";
if(!uri)throw new Error("MongoDB URI not defined");

let client:MongoClient = new MongoClient(uri);

let db:Db;

export async function getDb(): Promise<Db>{
    if(!db){
        await client.connect();
        db  = client.db("ecomax");
    }
    return db;
}