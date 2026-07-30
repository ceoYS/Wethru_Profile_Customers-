import type { CustomerProfile, ProfileSeo } from "../../types/profile";

/**
 * Data contract for a Campus-only anonymous mirror.
 *
 * The marker prevents the anonymous layout from accepting an ordinary customer
 * object by accident. The narrowed slug, SEO, and contact fields also make the
 * privacy boundary visible to TypeScript: a mirror cannot declare a personal
 * contact channel or an original-profile share image.
 */
export type CampusAnonProfile = Omit<
  CustomerProfile,
  "slug" | "seo" | "contact"
> & {
  readonly campusAnonymous: true;
  readonly slug: `case-${string}`;
  readonly seo: Omit<ProfileSeo, "ogImage"> & { readonly ogImage?: never };
  readonly contact: {
    readonly email?: never;
    readonly showEmail?: never;
    readonly phone?: never;
    readonly showPhone?: never;
    readonly links?: never;
  };
};
