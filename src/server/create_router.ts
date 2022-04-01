import * as trpc from "@trpc/server";
import { TrpcContext } from "./create_context";

export const createRouter = () => trpc.router<TrpcContext>();
