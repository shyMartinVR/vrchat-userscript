import { CommonTag, ISO_Time, NeedsMoreResearch } from "./index";
import { UnityUpload } from "./Unity";

/** wrld_id @see {@link VRC_ID} */
export type WorldID = string;

export interface World extends UnityUpload {
  id: WorldID;
  capacity: number;
  namespace: string | NeedsMoreResearch;
  organization: string;
  previewYoutubeId: string;
  udonProducts: NeedsMoreResearch[];
  favorites: number;
  visits: number;
  popularity: number;
  heat: number;
  publicationDate: ISO_Time;
  labsPublicationDate: ISO_Time;
  instances: [InstanceID, number][];
  publicOccupants: number;
  privateOccupants: number;
  occupants: number;
  tags: WorldTag[];
}

/** @see {@link WorldID} @see {@link InstanceID} */
export type VRC_Location = "private" | "offline" | `WorldID:InstanceID`;

/** [Instances on VRChatAPI](https://vrchatapi.github.io/tutorials/instances/) */
export type InstanceID = `Name~region(Region)`;

export type VRC_InstanceType =
  ""        | // public or offline
  "hidden"  | // friends+
  "friends" | // friends
  "private" | // invite / invite+
  NeedsMoreResearch ;

  /** [VRCAPI Tag docs](https://vrchatapi.github.io/tutorials/tags/) */
export type WorldTag =
  "author_tag_*" |
  "author_tag_avatar" |
  "author_tag_game" |
  "admin_featured" |
  "admin_approved" |
  "admin_avatar_world" |
  "admin_community_spotlight" |
  "admin_hidden" |
  "admin_hide_active" |
  "admin_hide_new" |
  "admin_hide_popular" |
  "debug_allowed" |
  "system_approved" |
  "system_created_recently" |
  "system_labs" |
  "system_updated_recently" |
  CommonTag ;
