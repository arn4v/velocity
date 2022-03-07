import {
	handleAuth,
	handleCallback,
	handleLogin,
	UserProfile,
} from "@auth0/nextjs-auth0";
import { prisma } from "~/lib/db.server";

export default handleAuth({
	async login(req, res) {
		await handleLogin(req, res, {
			returnTo: "/app",
		});
	},
	async callback(req, res) {
		await handleCallback(req, res, {
			async afterCallback(req, res, session, options) {
				const user = session.user as UserProfile;

				await prisma.user.upsert({
					where: { email: session?.user?.email },
					create: {
						auth0Id: user?.sub,
						name: user?.name as string,
						email: user?.email as string,
					},
					update: {
						auth0Id: session?.user?.sub,
					},
				});

				return session;
			},
		});
	},
});
