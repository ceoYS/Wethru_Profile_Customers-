import type { CustomerProfile } from "../types/profile";

/**
 * Auto-collects every customer file in src/data/customers/.
 * Adding a new customer never requires touching this file —
 * `npm run new:profile` just drops a new module in the folder.
 */
const modules = import.meta.glob<{ profile: CustomerProfile }>(
  "./customers/*.ts",
  { eager: true },
);

export const customers: CustomerProfile[] = Object.values(modules)
  .map((mod) => mod.profile)
  .sort((a, b) => a.slug.localeCompare(b.slug));

export const publishedCustomers: CustomerProfile[] = customers.filter(
  (customer) => customer.status === "published",
);

export const draftCustomers: CustomerProfile[] = customers.filter(
  (customer) => customer.status === "draft",
);

export function getCustomer(slug: string): CustomerProfile | undefined {
  return customers.find((customer) => customer.slug === slug);
}
