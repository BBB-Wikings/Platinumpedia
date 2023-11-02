// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type { Variant } from '$lib/utils/CssClassUtils';

declare namespace App {
	// interface Locals {}
	interface PageData {
		flash?: { type: Variant; message: string };
	}
	// interface Error {}
	// interface Platform {}
}
