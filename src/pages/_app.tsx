import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { httpLink } from "@trpc/client/links/httpLink";
import superjson from "superjson";
import type { AppRouter } from "~/server/routers/_app";
import { getDeploymentUrl } from "~/lib/utils.all";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";

function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<UserProvider>
				<Component {...pageProps} />
			</UserProvider>
		</ChakraProvider>
	);
}

export default withTRPC<AppRouter>({
	config() {
		return {
			links: [
				httpLink({
					url: `${getDeploymentUrl()}/api/trpc`,
				}),
			],
			url: `${getDeploymentUrl()}/api/trpc`,
			transformer: superjson,
		};
	},
	ssr: true,
})(App);
