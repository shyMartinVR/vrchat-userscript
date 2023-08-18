import { URLString, ISO_Time, Platform, HexString, NeedsMoreResearch } from "./index";
import { AvatarID } from "./Avatar";
import { LanguageTag } from "./Language";
import { VRC_Location, WorldID, InstanceID } from "./World";

/** usr_id @see {@link VRC_ID}*/
export type UserID = string;

export interface User {
  id: UserID;
  displayName: string;
  /** Small round icon with VRC+ */
  userIcon: string;
  bio: string;
  bioLinks: string[];
  /** Profile picture with VRC+ */
  profilePicOverride: string;
  /** Custom status */
  statusDescription: string;
  currentAvatarImageUrl: URLString;
  currentAvatarThumbnailImageUrl: URLString;
  tags: UserTag[];
  developerType: DeveloperType;
  last_login: ISO_Time;
  last_platform: Platform;
  allowAvatarCopying: boolean;
  status: UserStatus;
  /** Only date without time */
  date_joined: string; 
  isFriend: boolean;
  friendKey: HexString;
  last_activity: ISO_Time;
  location: VRC_Location;
  worldId: WorldID;
  instanceId: InstanceID;
  state: UserState;
  friendRequestStatus: NeedsMoreResearch;
  note: string;
}

export interface Friend extends User {
  fallbackAvatar: AvatarID;
  travelingToWorld: WorldID;
  travelingToInstance: InstanceID;
  travelingToLocation: VRC_Location;
}

export type DeveloperType = "internal" | "none";
export type UserStatus = "join me" | "active" | "ask me" | "do not disturb" | "offline";
export type UserState = "online" | "offline";

/** [VRCAPI Tag docs](https://vrchatapi.github.io/tutorials/tags/) */
export type UserTag =
  "admin_avatar_access" |
  "admin_can_grant_licenses" |
  "admin_canny_access" |
  "admin_lock_tags" |
  "admin_lock_level" |
  "admin_moderator" |
  "admin_official_thumbnail" |
  "admin_scripting_access" |
  "system_scripting_access" |
  "admin_world_access" |
  "show_social_rank" |
  "show_mod_tag" |
  "system_avatar_access" |
  "system_early_adopter" |
  "system_feedback_access" |
  "system_probable_troll" |
  "system_supporter" |
  "system_legend" |
  "system_troll" |
  "system_trust_basic" |
  "system_trust_known" |
  "system_trust_trusted" |
  "system_trust_veteran" |
  "system_trust_intermediate" |
  "system_trust_advanced" |
  "system_trust_legend" |
  "system_world_access" |
  LanguageTag ;
