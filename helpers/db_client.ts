import { MongoClient, Database } from "https://deno.land/x/mongo@v0.31.0/mod.ts";

let db: Database;

export async function connect() {
  const client = new MongoClient();
  await client.connect('mongodb+srv://node_test:node_test@cluster0.u9j79.mongodb.net/todos?authMechanism=SCRAM-SHA-1');

  db = client.database('todos');
}

export function getDb() {
  return db;
}
