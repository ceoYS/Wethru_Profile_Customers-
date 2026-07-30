import type { CampusAnonProfile } from "./types";
import { profile as caseTwo } from "./case-02";
import { profile as caseThree } from "./case-03";

/**
 * Anonymized mirror profiles for the "profile"-renderer cases, keyed by anon id.
 * These are authored, fully de-identified CustomerProfile objects — NOT derived
 * from the real customer index. (case-01 is a "clone" renderer and has no entry.)
 */
export const campusV4AnonProfiles: Record<string, CampusAnonProfile> = {
  "case-02": caseTwo,
  "case-03": caseThree,
};

/** Resolve an anon mirror profile, or throw (fail-closed — no real fallback). */
export function getAnonProfile(id: string): CampusAnonProfile {
  const profile = campusV4AnonProfiles[id];
  if (!profile) {
    throw new Error(
      `Campus V4: no anonymized mirror profile for "${id}". A "profile" case must ship ` +
        `src/data/campus-v4-anon/${id}.ts — refusing to fall back to real customer data.`,
    );
  }
  return profile;
}
