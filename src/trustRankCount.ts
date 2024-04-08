import { Friend, User, UserRank } from "../types/User";
import { friends, users } from "./data";
import { waitForElement } from "./global";
import { CustomProxy } from "./proxy";

export default function run(){

let trustRankContainer: HTMLDivElement;
const trustRankUl = document.createElement("ul");
trustRankUl.addEventListener("click", (event) =>{
  const list = {};
  Array.from(friends.values())
    .map(f => ({name:f.displayName, rank:getRankIndex(f)}))
    .sort(({rank: a},{rank: b}) => b - a)
    .forEach(({name, rank}) => list[name] = getRankFromIndex(rank));
  console.table(list);
});

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
    "Developer": 0,
    "Legend": 0,
    "Advanced": 0,
    "Intermediate": 0,
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

  const ranks : UserRank[] = [
    "Visitor",
    "New",
    "User",
    "Known",
    "Trusted",
    "Intermediate",
    "Advanced",
    "Legend",
    "Developer",
  ];

export function getRank(user: User) : UserRank {
  return getRankFromIndex(getRankIndex(user));
}

export function getRankFromIndex(index: number) : UserRank {
  return ranks[index];
}

export function getRankIndex(user: User) : number {
  const tags = new Set(user.tags);
  return (
    tags.has("admin_moderator")           ? 8 :
    tags.has("system_trust_legend")       ? 7 :
    tags.has("system_trust_advanced")     ? 6 :
    tags.has("system_trust_intermediate") ? 5 :

    tags.has("system_trust_veteran")      ? 4 :
    tags.has("system_trust_trusted")      ? 3 :
    tags.has("system_trust_known")        ? 2 :
    tags.has("system_trust_basic")        ? 1 :
    0
  );
}