export function variantGhostClass(color: string) {
	switch (color) {
		case 'secondary':
			return 'variant-ghost-secondary';
		case 'tertiary':
			return 'variant-ghost-tertiary';
		case 'success':
			return 'variant-ghost-success';
		case 'warning':
			return 'variant-ghost-warning';
		case 'error':
			return 'variant-ghost-error';
		case 'surface':
			return 'variant-ghost-surface';
		default:
			return 'variant-ghost-primary';
	}
}

export function variantGlassClass(color: string) {
	switch (color) {
		case 'secondary':
			return 'variant-glass-secondary';
		case 'tertiary':
			return 'variant-glass-tertiary';
		case 'success':
			return 'variant-glass-success';
		case 'warning':
			return 'variant-glass-warning';
		case 'error':
			return 'variant-glass-error';
		case 'surface':
			return 'variant-glass-surface';
		default:
			return 'variant-glass-primary';
	}
}
