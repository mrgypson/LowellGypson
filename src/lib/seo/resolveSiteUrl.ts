function normalizeSiteUrl(url: string): string {
	return url.replace(/\/$/, '');
}

function vercelHostToSiteUrl(host: string): string {
	const hostname = host.replace(/^https?:\/\//, '').replace(/\/$/, '');
	return normalizeSiteUrl(`https://${hostname}`);
}

export function resolveSiteUrl(): string {
	const explicit = process.env.SITE_URL?.trim();
	if (explicit) {
		return normalizeSiteUrl(explicit);
	}

	const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
	if (productionHost) {
		return vercelHostToSiteUrl(productionHost);
	}

	const deploymentHost = process.env.VERCEL_URL?.trim();
	if (deploymentHost) {
		return vercelHostToSiteUrl(deploymentHost);
	}

	return 'http://localhost:4321';
}

export function assertProductionSiteUrl(siteUrl: string): void {
	if (process.env.VERCEL !== '1' || process.env.VERCEL_ENV !== 'production') {
		return;
	}

	if (!siteUrl.startsWith('http://localhost')) {
		return;
	}

	throw new Error(
		'Production build resolved site URL to localhost. Set SITE_URL in Vercel and redeploy.',
	);
}
