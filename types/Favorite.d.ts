import { VRC_ID } from "./index";
import { Avatar } from "./Avatar";
import { ReleaseStatus } from "./Unity"
import { Friend, UserID } from "./User"
import { World } from "./World";

export interface FavoriteGroup {
  id: VRC_ID;
  ownerId: UserID;
  ownerDisplayName: string;
  name: string;
  displayName: string;
  type: keyof FavoriteMap;
  visibility: ReleaseStatus;
  tags: string[];
}

export interface Favorite<K extends keyof FavoriteMap> {
  id: VRC_ID;
  type: K;
  favoriteId: FavoriteMap[K];
  tags: string[];
}

export interface FavoriteMap{
    friend: Friend;
    avatar: Avatar;
    world: World;
}

