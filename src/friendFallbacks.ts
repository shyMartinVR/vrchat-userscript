import { Friend } from "../types/User";
import { waitForElement } from "./global";
import { CustomProxy } from "./proxy";

export default function run(){

const fallbackContainer = document.createElement("div");
const ul = document.createElement("ul");
fallbackContainer.append(ul);

CustomProxy.Listen<Friend[]>(
  (url) => url.pathname === "auth/user/friends",
  (friends) => {
    for (const { fallbackAvatar, displayName } of friends) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `https://vrchat.com/home/avatar/${fallbackAvatar}`;
      a.textContent = displayName;
      li.append(a);
      ul.append(li);
    }
  }
);

window.addEventListener("pathchange", (event) => {
  setTimeout(async () => {
    if (event.subPath === "avatars/fallbacks") {
      (await waitForElement(".home-content")).append(fallbackContainer);
    } else if (fallbackContainer) {
      fallbackContainer.remove();
    }
  }, 100);
});
}
