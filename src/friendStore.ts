import { Friend, UserID } from "../types/User";
import { friends } from "./data";
import { waitForElement } from "./global";
import { CustomProxy } from "./proxy";

export default function run(){
CustomProxy.Listen(
  ({ subPath }) => subPath === "auth/user/friends",
  (_) => {
    waitForElement(".ps-1").then((elem) => {
      if (friends.size === parseInt(elem.textContent)) {
        const prevFriends: UserID[] = JSON.parse(localStorage.getItem("friends")) || [];
        localStorage.setItem(
          "friends",
          JSON.stringify(Array.from(friends.keys()))
        );
        if (prevFriends) {
          for (const friend of prevFriends) {
            if (!friends.has(friend)) {
              console.log(
                `Missing friend: https://vrchat.com/home/user/${friend}`
              );
              elem.parentElement.append("❗");
              const missingFriends = new Set(
                JSON.parse(localStorage.getItem("missingFriends"))
              );
              missingFriends.add(friend);
              localStorage.setItem(
                "missingFriends",
                JSON.stringify(Array.from(missingFriends))
              );
            }
          }
        }
      }
    });
  }
);
}