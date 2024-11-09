# URL Shortener Application

This is a URL shortener application that allows users to generate short URLs, retrieve the original URLs, and manage them effectively. The application uses a base-62 encoding algorithm for generating unique short codes for URLs.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [URL Short Code Generation Algorithm](#url-short-code-generation-algorithm)
- [API Endpoints](#api-endpoints)

## Prerequisites

Before setting up the application, ensure you have the following tools installed:

- **Node.js** (version 14.x or later)
- **npm** (Node Package Manager)

## Setup

1. Clone the repository:
   ```bash
      git clone https://github.com/yourusername/url-shortener.git
   ```
2. Navigate to the project directory:

- Follow the directions described in Setup.md

## URL Short Code Generation Algorithm

This application uses a bijective base-62 encoding algorithm to generate unique short codes for URLs. The bijective encoding method ensures that every number gets mapped to a unique, short string, which is perfect for generating URL short codes that are concise and easily shareable.

### Bijective Base-62 Encoding

The algorithm uses the following alphabet for encoding and decoding:

```js
const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
```

This alphabet has 62 characters, which gives us a base-62 system (62 unique values). The base-62 system is used to convert a numeric ID into a short string.

#### Bijective Encode Function

The bijectiveEncode function converts a numeric ID (the ID for the URL in the database) into a short base-62 string. This string is the URL short code.

```js
export function bijectiveEncode(num: number): string {
	if (num === 0) return ALPHABET[0];

	let s = '';
	while (num > 0) {
		s = ALPHABET[num % BASE] + s;
		num = Math.floor(num / BASE);
	}

	return s;
}
```

- Example:
  If num = 12345, the function will return the corresponding short code based on the base-62 encoding.

#### Bijective Decode Function

The bijectiveDecode function converts a base-62 short code back into the original numeric ID.

```js
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
```

- Example:
  If str = 'dnh', the function will decode it to the corresponding numeric ID (which could be the ID of the URL in the database).

  ### How It Works

  1. When a user submits a URL for shortening, the backend stores the URL in a database and generates a unique numeric ID for it.
  2. The bijectiveEncode function is used to convert the numeric ID into a short URL code.
  3. The short code is returned to the user, who can use it to retrieve the original URL by passing the short code to the API.
  4. When a user accesses a short URL, the bijectiveDecode function is used to convert the short code back to the original numeric ID, and the corresponding original URL is retrieved from the database.

  ### Example Workflow

  - User submits a URL: https://example.com/very-long-url.
  - The application generates a unique numeric ID (e.g., 12345).
  - The bijectiveEncode(12345) function converts this ID into a short code (e.g., dnh).
  - The short URL http://localhost:3000/dnh is returned to the user.
  - The user accesses the short URL, and the application decodes the short code dnh back into the ID 12345 using bijectiveDecode('dnh').
  - The original URL https://example.com/very-long-url is returned.

  ### API Endpoints

  - POST /shorten

  - Body: { "originalUrl": "https://example.com" }
  - Response: { "shortUrl": "http://localhost:3000/abc123" }
  - GET /

  - Parameters: shortCode
    - Response: { "originalUrl": "https://example.com" }
