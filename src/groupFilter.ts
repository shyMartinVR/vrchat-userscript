// disabled for now
// import { fetchFavorites, fetchGroups } from "./api";
// import { friends } from "./data";
// import { waitForElement } from "./global";

// window.addEventListener("pathchange", async (event) => {
//   if (!event.subPath.startsWith("friends")) return;
//   const containerP = waitForElement(".home-content");
//   const match = event.subPath.match(/^friends\/(.+)/);
//   if (match) {
//     const groupName = match[1];
//     const favoritesP = fetchFavorites(100, 0, "friend",groupName );
//     Promise.all([favoritesP, containerP]).then(([favorites, container]) => {
//       container.replaceChildren();
//       const ul = document.createElement("ul");
//       /** @type {Friend[]} */
//       const filtered = favorites
//         .filter(({ favoriteId }) => friends.has(favoriteId))
//         .map(({ favoriteId }) => friends.get(favoriteId));

//       if (filtered.length > 0) {
//         const h2 = document.createElement("h2");
//         h2.textContent = `${filtered.length} friends`;
//         container.append(h2);
//         for (const friend of filtered) {
//           const a = document.createElement("a");
//           a.textContent = friend.displayName;
//           a.href = `/home/user/${friend.id}`;
//           a.target = "_blank";
//           const li = document.createElement("li");

//           li.append(a);
//           ul.append(li);
//         }

//         container.append(ul);
//       } else {
//         container.append("No friends in this list");
//       }
//     });
//   } else {
//     const groupsP = fetchGroups();
//     Promise.all([groupsP, containerP]).then(([groups, container]) => {
//       container.replaceChildren();
//       for (const group of groups) {
//         if (group.type === "friend") {
//           const button = document.createElement("button");
//           button.textContent = group.displayName;
//           button.addEventListener("click", (_) => {
//             history.pushState(null, "", `/home/friends/${group.name}`);
//           });
//           container.append(button);
//         }
//       }
//     });
//   }
// });

// waitForElement(".e1oqhh5q8").then((container) => {
//   const friendsText = container.childNodes.item(1);
//   friendsText.style.textDecoration = "underline";
//   friendsText.addEventListener("click", (_) => {
//     history.pushState(null, "", "/home/friends/");
//   });
// });
