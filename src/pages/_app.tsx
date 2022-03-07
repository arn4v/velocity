import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next';
import { httpLink } from "@trpc/client/links/httpLink";
import superjson from 'superjson'
import type { AppRouter } from '~/server/routers/_app';
import { getDeploymentUrl } from '~/lib/utils.all';


function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
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
