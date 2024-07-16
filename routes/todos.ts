import { Context, Router } from "https://deno.land/x/oak@v16.1.0/mod.ts";

const router = new Router();

interface Todo {
    id: string;
    text: string;
}

const todos: Todo[] = [];

router.get("/todos", (ctx) => {
    ctx.response.body = { todos };
});

router.post(
    "/todos",
    async (ctx: Context) => {
        if (!ctx.request.hasBody) {
            ctx.response.status = 400;
            ctx.response.body = { message: "No data" };
            return;
        }

        const body = await ctx.request.body.json();

        const newTodo: Todo = {
            id: new Date().toISOString(),
            text: body.text,
        };
        todos.push(newTodo);

        ctx.response.body = {
            message: "Todo created",
            todo: newTodo,
        };
    },
);

router.put("/todos/:todoId", async (ctx) => {
    const todoId = ctx.params.todoId;
    const body = await ctx.request.body.json();

    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    todos[todoIndex] = { id: todoId, text: body.text };

    ctx.response.body = { message: "Todo updated" };
});

router.delete("/todos/:todoId", (ctx) => {
    const todoId = ctx.params.todoId;

    todos.splice(todos.findIndex((todo) => todo.id === todoId), 1);

    ctx.response.body = { message: "Todo deleted" };
});

export default router;
