import { getSession, Session, UserProfile } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";
import * as trpc from "@trpc/server";
import { prisma } from "~/lib/db.server";
import * as trpcNext from "@trpc/server/adapters/next";

export const createContext = async ({
	req,
	res,
}: trpcNext.CreateNextContextOptions) => {
	const ctx = {
		req,
		res,
		prisma: db,
		session: null as Session | null,
		auth0user: null as UserProfile | null,
		user: null as User | null,
	};

	const session = getSession(req, res);

	if (session) {
		ctx.session = session;

		const auth0user = session?.user as UserProfile;

		const user = await prisma.user.findUnique({
			where: { email: auth0user?.email as string },
		});

		if (user) {
			ctx.user = user;
		}
	}

	return ctx;
};

export type TrpcContext = trpc.inferAsyncReturnType<typeof createContext>;
