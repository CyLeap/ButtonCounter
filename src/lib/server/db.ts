import { createClient } from "@libsql/client"
import { env } from "$env/dynamic/private"

if (!env.TURSO_DATABASE_URL || !env.TURSO_AUTH_TOKEN) {
	throw new Error("Turso database environment variables are not configured")
}

export const db = createClient({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN,
})
