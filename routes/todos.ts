import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.0/mod.ts";

import { getDb } from '../helpers/db_client.ts';

const router = new Router();

interface Todo {
  _id?: ObjectId;
  text: string;
}

router.get('/todos', async (ctx) => {
  const todos = await getDb().collection<Todo>('todos').find().sort({ text: 1 }).toArray();
  ctx.response.body = { todos: todos };
});

router.get('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId;
  const todo = await getDb().collection<Todo>('todos').findOne({ _id: new ObjectId(tid) });
  ctx.response.body = todo;
});

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body().value;
  const newTodo: Todo = {
    text: data.text,
  };
  const id = await getDb().collection<Todo>('todos').insertOne(newTodo);
  newTodo._id = id;
  ctx.response.body = { message: 'Created todo!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body().value;
  await getDb().collection<Todo>('todos')
    .updateOne({ _id: new ObjectId(tid) }, { $set: { text: data.text } });
  ctx.response.body = { message: 'Updated todo' };
});

router.delete('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId!;
  await getDb().collection<Todo>('todos').deleteOne({ _id: new ObjectId(tid) });

  ctx.response.body = { message: 'Deleted todo' };
});

export default router;
