import { Avatar } from "../types/Avatar";
import { switchAvatarFallback } from "./api";
import { avatars } from "./data";
import { CustomProxy } from "./proxy";

export default function run(){

const avatarPattern = /\/home\/avatar\/(.+)/;

CustomProxy.Listen<Avatar>(
  ({ subPath }) => subPath.startsWith("avatars/"),
  (avatar) => avatars.set(avatar.id, avatar)
);

function switchFallback(event: MouseEvent): void {
  event.preventDefault();
  const match = location.pathname.match(avatarPattern);
  if(!match) return;
  const avatarId = match[1];
    
    switchAvatarFallback(avatarId).then((res) => {
      this.className = "btn";
      let status = res.ok ? "success" : "danger";
      this.classList.add(`btn-${status}`);
    });
}

window.addEventListener("pathchange", (event) => {
  const match = event.pathname.match(avatarPattern);
  if (!match) return;
    const avatarId = match[1];
    setTimeout(() => {
      const button = Array.from(document.querySelectorAll<HTMLButtonElement>(".e7cdgnz1")).find(
        (button) => button.textContent?.trim() === "Switch to Avatar"
      );
      if (
        button !== undefined &&
        avatars.get(avatarId)?.tags.includes("author_quest_fallback")
      ) {
        button.addEventListener("contextmenu", switchFallback, {
          once: true,
        });
      }
    }, 1000);
  
});
}