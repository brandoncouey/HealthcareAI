import crypto from "node:crypto";

/** Hash the token with a strong one-way hash; never store raw tokens in the DB. */
export function hashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("base64url");
}
