import { AvatarID } from "../types/Avatar";
import { FavoriteGroup, FavoriteMap } from "../types/Favorite";
import { Friend, User, UserID } from "../types/User";
import { API_URL, CustomFetch } from "./proxy";

export function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  return new Promise((resolve, reject) => {
    CustomFetch.fetch(input, init).then((response) => {
      response.json().then((json) => {
        if (response.ok) resolve(json);
        else reject(json);
      });
    });
  });
}

export function fetchFavorites<K extends keyof FavoriteMap>(n: number, offset: number, type: K, tag: string): Promise<FavoriteMap[K][]> {
  const url = API_URL.fromFragment("favorites");
  url.searchParams.set("n", n.toString());
  url.searchParams.set("offset", offset.toString());
  url.searchParams.set("type", type);
  url.searchParams.set("tag", tag);
  return fetchJson(url);
}

export function fetchGroups(n: number = 100, offset: number = 0, ownerId: UserID): Promise<FavoriteGroup[]> {
  const url = API_URL.fromFragment("favorite/groups");
  url.searchParams.set("n", n.toString());
  url.searchParams.set("offset", offset.toString());
  if (ownerId) url.searchParams.set("ownerId", ownerId);
  return fetchJson(url);
}

export function switchAvatarFallback(avatarId: AvatarID) {
  const url = API_URL.fromFragment(`avatars/${avatarId}/selectFallback`);
  return CustomFetch.fetch(url, { method: "PUT" });
}