/** This Property needs more research */
export interface NeedsMoreResearch{}
/** Prefix followed by 8 + 4 + 4 + 4 + 12 hex characters. */
type VRC_ID = "xxx_01234567-89ab-cdef-0123-456789abcdef";

/** not_id @see {@link VRC_ID} */
export type NotificationID = string;

/** file_id @see {@link VRC_ID} */
export type FileID = string;

/** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) */
export type ISO_Time = string;

/** String only containing **0-9** and **a-f** */
export type HexString = string;

export type URLString = string;

export type Platform = "standalonewindows" | "android";

export type CommonTag = "content_sex" | "content_gore" | "content_violence" | "content_other";

