import superjson from "superjson";
import { trpcAuthMiddleware } from "../auth-middleware";
import { createRouter } from "../create-router";

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

	export type AppRouter = typeof appRouter