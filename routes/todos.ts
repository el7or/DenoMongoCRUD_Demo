import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [
  { id: 'abc', text: "First ToDo", },
  { id: 'xyz', text: "Second ToDo", }
];

router.get('/todos', (ctx) => {
  ctx.response.body = { todos: todos };
});

router.get('/todos/:todoId', (ctx) => {
  const tid = ctx.params.todoId;
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tid;
  });
  ctx.response.body = todos[todoIndex];
});

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body().value;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.text,
  };

  todos.push(newTodo);

  ctx.response.body = { message: 'Created todo!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body().value;
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tid;
  });
  todos[todoIndex] = { id: todos[todoIndex].id, text: data.text };
  ctx.response.body = { message: 'Updated todo', todos: todos };
});

router.delete('/todos/:todoId', (ctx) => {
  const tid = ctx.params.todoId;
  todos = todos.filter((todo) => todo.id !== tid);
  ctx.response.body = { message: 'Deleted todo', todos: todos };
});

export default router;
