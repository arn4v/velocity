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
			returnTo: (req.query?.["redirectTo"] as string) ?? "/app",
		});
	},
	async callback(req, res) {
		await handleCallback(req, res, {
			async afterCallback(req, res, session, state) {
				const user = session.user as UserProfile;

				let firstName: string | undefined = undefined,
					lastName: string | undefined = undefined;

				switch (true) {
					case !user?.name?.length: {
						break;
					}
					case user?.name?.includes(" "): {
						const splitName = user?.name?.split(" ");
						if (splitName?.length) {
							firstName = splitName[0];
							lastName = splitName[1];
						}
						break;
					}
					case !!user?.name: {
						firstName = user?.name as string;
						break;
					}
				}

				await prisma.user.upsert({
					where: { email: session?.user?.email },
					create: {
						providerId: user?.sub,
						email: user?.email as string,
						...(firstName ? { firstName } : {}),
						...(lastName ? { lastName } : {}),
					},
					update: {
						providerId: user?.sub,
					},
				});

				return session;
			},
		});
	},
});
