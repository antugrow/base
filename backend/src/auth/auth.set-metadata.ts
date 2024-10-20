import { SetMetadata } from "@nestjs/common";

/**
 * Key for the metadata that we will set on routes that are public.
 */
export const IS_PUBLIC_KEY = "isPublic";

/**
 * This is a custom decorator that we will use to mark routes as public.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
