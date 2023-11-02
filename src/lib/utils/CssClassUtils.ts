export enum Variant {
	Primary = 'primary',
	Secondary = 'secondary',
	Tertiary = 'tertiary',
	Success = 'success',
	Warning = 'warning',
	Error = 'error',
	Surface = 'surface'
}

export function variantGhostClass(color: Variant) {
	switch (color) {
		case Variant.Secondary:
			return 'variant-ghost-secondary';
		case Variant.Tertiary:
			return 'variant-ghost-tertiary';
		case Variant.Success:
			return 'variant-ghost-success';
		case Variant.Warning:
			return 'variant-ghost-warning';
		case Variant.Error:
			return 'variant-ghost-error';
		case Variant.Surface:
			return 'variant-ghost-surface';
		default:
			return 'variant-ghost-primary';
	}
}

export function variantGlassClass(color: Variant) {
	switch (color) {
		case Variant.Secondary:
			return 'variant-glass-secondary';
		case Variant.Tertiary:
			return 'variant-glass-tertiary';
		case Variant.Success:
			return 'variant-glass-success';
		case Variant.Warning:
			return 'variant-glass-warning';
		case Variant.Error:
			return 'variant-glass-error';
		case Variant.Surface:
			return 'variant-glass-surface';
		default:
			return 'variant-glass-primary';
	}
}
