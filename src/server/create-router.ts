import * as trpc from "@trpc/server";
import { TrpcContext } from "./create-context";

export const createRouter = () => trpc.router<TrpcContext>();
