import { URLString, NeedsMoreResearch, ISO_Time, Platform } from "./index";
import { UserID } from "./User";

/** unp_id @see {@link VRC_ID} */
export type UnityPackageID = string;
export type ReleaseStatus = "private" | "public";

export interface UnityUpload {
  id: string;
  name: string;
  description: string;
  authorId: UserID;
  authorName: string;
  imageUrl: URLString;
  thumbnailImageUrl: URLString;
  releaseStatus: ReleaseStatus;
  version: number;
  featured: boolean;
  unityPackages: UnityPackage[];
  unityPackageUrl: URLString;
  unityPackageUrlObject: Object | NeedsMoreResearch;
  created_at: ISO_Time;
  updated_at: ISO_Time;
  tags: string[];
}

export interface UnityPackage {
  id: UnityPackageID;
  created_at: ISO_Time;
  unityVersion: string;
  assetVersion: number;
  assetUrl: URLString | NeedsMoreResearch;
  pluginUrl: URLString | NeedsMoreResearch;
  platform: Platform;
  variant: string | NeedsMoreResearch;
}
