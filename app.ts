import { Application } from "https://deno.land/x/oak@v16.1.0/mod.ts";

import router from "./routes/todos.ts";

const app = new Application();

app.use(async (_ctx, next) => {
    console.log("Middleware");
    await next();
});

app.use(async (ctx, next) => {
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    ctx.response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE",
    );
    ctx.response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
    );
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
