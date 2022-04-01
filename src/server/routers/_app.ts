import superjson from "superjson";
import { trpcAuthMiddleware } from "../middlewares/auth";
import { createRouter } from "../create_router";

export const appRouter = createRouter()
	.transformer(superjson)
	.merge(
		"protected.",
		createRouter()
			.middleware(trpcAuthMiddleware)
			.query("hello", {
				resolve() {
					return "Hello";
				},
			}),
	)
	.merge(
		"public.",
		createRouter().query("hello", {
			resolve() {
				return "No Auth - Hello";
			},
		}),
	);

export type AppRouter = typeof appRouter;
