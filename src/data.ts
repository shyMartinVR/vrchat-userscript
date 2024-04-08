import { AvatarID, Avatar } from "../types/Avatar";
import { Friend, User, UserID } from "../types/User";
import { WorldID, World } from "../types/World";

export const users: Map<UserID, User> = new Map();
export const friends: Map<UserID, Friend> = new Map();
export const avatars: Map<AvatarID, Avatar> = new Map();
export const worlds: Map<WorldID, World> = new Map();

// @ts-ignore
unsafeWindow.users = users;
// @ts-ignore
unsafeWindow.friends = friends;
// @ts-ignore
unsafeWindow.avatars = avatars;
// @ts-ignore
unsafeWindow.worlds = worlds;
