import colorable from 'colorable';
import Vibrant from 'node-vibrant';

export const resolveUrl = async unresolvedUrl => {
	try {
		const { url } = await fetch(unresolvedUrl);
		return url;
	} catch (err) {
		return unresolvedUrl;
	}
};

export const urlWithParams = (urlStr, params) => {
	const url = new URL(urlStr);
	Object.keys(params).forEach(key => url.searchParams.set(key, params[key]));
	return url;
};

export const validImgUrl = imgUrl =>
	new Promise(resolve => {
		try {
			const img = new Image();
			img.onload = () => {
				resolve(true);
			};
			img.onerror = () => {
				resolve(false);
			};
			img.src = imgUrl;
		} catch (err) {
			resolve(false);
		}
	});

export const textColor = hexcolor => {
	const hex = hexcolor.startsWith('#') ? hexcolor.substr(1) : hexcolor;
	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128
		? {
			name: 'Black',
			hex: '#000000',
		}
		: {
			name: 'White',
			hex: '#ffffff',
		};
};

export const descByKey = key => (a, b) => {
	if (a[key] > b[key]) {
		return -1;
	}
	if (a[key] < b[key]) {
		return 1;
	}
	return 0;
};

export const paletteFromUrl = url =>
	Vibrant.from(url)
		.getPalette()
		.then(paletteWithContrast);

const colorableOpts = { compact: true, threshold: 4.5 };

export const paletteWithContrast = palette => {
	const colorMatrix = colorable(palette, colorableOpts);
	return Object.keys(palette).map(key => {
		const swatch = palette[key];
		const [contrastColor] = colorMatrix
			.filter(({ name }) => name === key)
			.map(({ combinations }) => {
				if (combinations.length) {
					const [best] = combinations.sort(descByKey('contrast'));
					return {
						...best,
						hex: best.hex.toLowerCase(),
					};
				}
				const yiq = textColor(swatch.hex);
				const [blackOrWhite] = colorable(
					{ [swatch.name]: swatch.hex, [yiq.name]: yiq.hex },
					{ compact: true },
				);
				const [contrastObj] = blackOrWhite.combinations;
				return {
					...contrastObj,
					hex: contrastObj.hex.toLowerCase(),
				};
			});
		return {
			name: key,
			hex: swatch.hex,
			rgb: swatch.rgb,
			population: swatch.population,
			contrastColor,
			css: {
				backgroundColor: swatch.hex,
				color: contrastColor.hex,
			},
		};
	});
};
