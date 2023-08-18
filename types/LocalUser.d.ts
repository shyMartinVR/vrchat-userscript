import { NeedsMoreResearch, URLString, ISO_Time } from ".";
import { AvatarID } from "./Avatar";
import { GroupID } from "./Group";
import { User, UserID } from "./User";
import { WorldID, VRC_InstanceType, InstanceID } from "./World";

export interface LocalUser extends User {
  /** login name */
  username: string;
  pastDisplayNames: string[];
  hasEmail: boolean;
  hasPendingEmail: boolean;
  obfuscatedEmail: string;
  obfuscatedPendingEmail: string;
  emailVerified: boolean;
  hasBirthday: boolean;
  unsubscribe: boolean;
  statusHistory: string[];
  statusFirstTime: boolean;
  friends: UserID[];
  friendGroupNames: NeedsMoreResearch[];
  currentAvatar: AvatarID;
  currentAvatarAssetUrl: URLString;
  fallbackAvatar: AvatarID;
  accountDeletionDate: NeedsMoreResearch;
  accountDeletionLog: NeedsMoreResearch;
  acceptedTOSVersion: number;
  acceptedPrivacyVersion: number;
  steamId: string;
  steamDetails: Object | NeedsMoreResearch;
  oculusId: string;
  hasLoggedInFromClient: boolean;
  homeLocation: WorldID;
  twoFactorAuthEnabled: boolean;
  twoFactorAuthEnabledDate: ISO_Time;
  updated_at: ISO_Time;
  onlineFriends: UserID[];
  activeFriends:  UserID[];
  presence: UserPresence;
  offlineFriends:  UserID[];
}

export interface UserPresence{
    instanceType: VRC_InstanceType;
    avatarThumbnail: string;
    travelingToWorld: Location;
    world: WorldID | NeedsMoreResearch;
    displayName: string;
    instance: InstanceID;
    groups: GroupID[];
    debugflag: "1" | NeedsMoreResearch;
}
