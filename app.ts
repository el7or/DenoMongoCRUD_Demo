// import { serve } from "https://deno.land/std@0.149.0/http/server.ts";

// serve((_req) => new Response("Hello, world\n"), {
//     port: 3000,
//     onListen({ port, hostname }) {
//         console.log(`Server started at http://${hostname}:${port}`);
//     },
// });

import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import todosRoutes from './routes/todos.ts';

const app = new Application();

app.use(async (ctx, next) => {
    console.log(ctx.request.method, ctx.request.url.href);
    await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

app.listen({ port: 8000 })
    .then(() => {

    })
    .catch((err) => {
        console.error(err);
    });

console.log('Listening on http://localhost:8000');