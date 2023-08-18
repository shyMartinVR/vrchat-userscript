import { Friend, User } from "../types/User";
import { friends } from "./data";
import { waitForElement } from "./global";
import { CustomProxy } from "./proxy";

export default function run(){

let trustRankContainer: HTMLDivElement;
const trustRankUl = document.createElement("ul");

CustomProxy.Listen<Friend[]>(
  (url) => url.subPath === "auth/user/friends",
  (data) => {
    for (const friend of data) friends.set(friend.id, friend);
    if (trustRankContainer === undefined)
      waitForElement<HTMLDivElement>(".leftbar div").then((element) => {
        trustRankContainer = element;
        updateTrustList(trustRankContainer);
      });
    else updateTrustList(trustRankContainer);
  }
);

function updateTrustList(container: HTMLElement) {
  trustRankUl.replaceChildren();
  const rankCount = {
    "Trusted": 0,
    "Known": 0,
    "User": 0,
    "New": 0,
    "Visitor": 0
  };

  for (const friend of friends.values()) {
    const rank = getRank(friend);
    if (rank in rankCount) rankCount[rank]++;
    else rankCount[rank] = 1;
  }

  for (const [key, value] of Object.entries(rankCount)) {
    if (value === 0) continue;
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    trustRankUl.append(li);
  }
  container.append(trustRankUl);
}


}

export function getRank(user: User) {
  const tags = new Set(user.tags);
  // prettier-ignore
  return (
    tags.has("admin_moderator")           ? "Developer"   :
    tags.has("system_trust_legend")       ? "Legend"      :
    tags.has("system_trust_advanced")     ? "Advanced"    :
    tags.has("system_trust_intermediate") ? "Intermediate":

    tags.has("system_trust_veteran") ? "Trusted":
    tags.has("system_trust_trusted") ? "Known"  :
    tags.has("system_trust_known")   ? "User"   :
    tags.has("system_trust_basic")   ? "New"    :
    "Visitor"
  );
}