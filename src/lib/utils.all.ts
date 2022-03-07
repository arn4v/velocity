export function getDeploymentUrl() {
	switch (true) {
		case !!process.env.NEXT_PUBLIC_DEPLOYMENT_URL: {
			return process.env.NEXT_PUBLIC_DEPLOYMENT_URL;
		}
		default: {
			return "http://localhost:3000";
		}
	}
}
