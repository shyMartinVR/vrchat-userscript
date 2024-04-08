import { UserID } from "../types/User";
import { friends } from "./data";
import { waitForElement } from "./global";
import { CustomProxy } from "./proxy";

export default function run() {
  const friendStore = "friends";
  const dbRequest = indexedDB.open("martin", 2);
  dbRequest.onupgradeneeded = (_) => {
    if (!dbRequest.result.objectStoreNames.contains(friendStore))
      dbRequest.result.createObjectStore(friendStore);
  };
  const dbPromise: Promise<IDBDatabase> = new Promise((resolve, reject) => {
    dbRequest.onsuccess = (_) => resolve(dbRequest.result);
    dbRequest.onerror = reject;
  });

  const elemPromise = waitForElement(".ps-1");
  const allFriendsPromise = new Promise<void>((resolve, _) => {
    CustomProxy.Listen(
      ({ subPath }) => subPath === "auth/user/friends",
      (_) => {
        elemPromise.then((elem) => {
          if (friends.size === parseInt(elem.textContent)) resolve();
        });
      }
    );
  });

  Promise.all([elemPromise, dbPromise, allFriendsPromise]).then(
    ([elem, db, _]) => {
      for (const [key, friend] of friends) {
        db.transaction(friendStore, "readwrite")
          .objectStore(friendStore)
          .put({ id: key, name: friend.displayName }, key);
      }

      db
        .transaction(friendStore, "readonly")
        .objectStore(friendStore)
        .getAll().onsuccess = function (event) {
        const prevFriends: { id: UserID; name: string }[] = this.result;

        for (const { id, name } of prevFriends) {
          if (!friends.has(id)) {
            console.log(
              `Missing friend ${name} https://vrchat.com/home/user/${id}`
            );
            const button = document.createElement("button");
            button.textContent = name;
            button.onclick = (event) => {
              db
                .transaction(friendStore, "readwrite")
                .objectStore(friendStore)
                .delete(id).onsuccess = () => button.remove();
            };
            elem.parentElement.parentElement.parentElement.append(button);
          }
        }
      };
    }
  );
}
