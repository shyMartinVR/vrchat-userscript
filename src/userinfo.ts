import { User, UserTag } from "../types/User";
import { users } from "./data";
import { waitForElement } from "./global";
import { CustomProxy } from "./proxy";

export default function run(){

CustomProxy.Listen<User>(
  ({ subPath }) => subPath.startsWith("users/"),
  (user) => users.set(user.id, user)
);

window.addEventListener("pathchange", (event) => {
  if (!event.subPath.startsWith("user/")) return;
  const user = users.get(event.subPath.substring(5));
  if (user === undefined) return;
  const { last_platform, displayName, date_joined, developerType, tags } = user;
  waitForElement("h2").then((container) => {
    const platform = platformNames.get(last_platform) || last_platform;
    container.textContent = `${displayName} - ${platform} - ${date_joined}`;

    container.classList[tags.includes("system_supporter") ? "add" : "remove"](
      "martin-plusIcon"
    );

    if (developerType !== "none")
      container.textContent += ` - ${developerType}`;

    const ul = document.createElement("ul");

    for (const tag of tags.filter(showTag)) {
      const li = document.createElement("li");
      li.textContent = tag;
      ul.append(li);
    }

    for (const tag of shouldHave.filter((t:UserTag) => !tags.includes(t))) {
      const li = document.createElement("li");
      li.textContent = `Missing ${tag}`;
      ul.append(li);
    }

    if (ul.childElementCount > 0) container.append(ul);
  });
});

const platformNames = new Map([
  ["standalonewindows", "PC"],
  ["android", "Quest"],
]);

function showTag(tag: UserTag) {
  return !(tag.startsWith("language") || blacklist.has(tag));
}

const blacklist = new Set<UserTag>([
  // "admin_avatar_access",
  // "admin_world_access",
  // "admin_canny_access",
  // "admin_scripting_access",
  // "admin_can_grant_licenses",

  // "admin_lock_level",
  // "admin_lock_tags",

  // "admin_moderator",
  // "admin_official_thumbnail",

  // "show_mod_tag",
  "show_social_rank",

  // "system_no_captcha",

  "system_avatar_access",
  "system_feedback_access",
  "system_world_access",

  "system_early_adopter",
  "system_supporter",

  // "system_probable_troll",
  // "system_troll",

  "system_trust_basic",
  "system_trust_known",
  "system_trust_trusted",
  "system_trust_veteran",

  // "system_trust_advanced",
  // "system_trust_intermediate",
  // "system_trust_legend",
  // "system_legend",
]);

const shouldHave: UserTag[] = [
  "system_feedback_access",
  "system_avatar_access",
  "system_world_access",
];
}