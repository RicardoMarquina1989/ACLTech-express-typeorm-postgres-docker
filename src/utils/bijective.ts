// src/utils/bijective.ts

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const BASE = ALPHABET.length;

/**
 * Bijective encode function: Converts a number to a base-62 string.
 * @param num - The integer to encode.
 * @returns The base-62 encoded string.
 */
export function bijectiveEncode(num: number): string {
	if (num === 0) return ALPHABET[0];

	let s = '';
	while (num > 0) {
		s = ALPHABET[num % BASE] + s;
		num = Math.floor(num / BASE);
	}

	return s;
}

/**
 * Bijective decode function: Converts a base-62 string back to a number.
 * @param str - The base-62 encoded string.
 * @returns The decoded number.
 */
export function bijectiveDecode(str: string): number {
	let num = 0;
	for (let i = 0; i < str.length; i++) {
		const index = ALPHABET.indexOf(str[i]);
		if (index === -1) {
			throw new Error(`Invalid character found: ${str[i]}`);
		}
		num = num * BASE + index;
	}

	return num;
}
