import { handleLogin } from "@auth0/nextjs-auth0";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
	await handleLogin(req, res, {
		authorizationParams: {
			screen_hint: "signup", // this prompts the signup screen
		},
	});
};

export default handler;
