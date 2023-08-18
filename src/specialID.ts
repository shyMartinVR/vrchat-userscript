import { Avatar } from "../types/Avatar";
import { User } from "../types/User";
import { World } from "../types/World";
import { CustomProxy } from "./proxy";

export default function run(){

const hex = (n: number, p = "-") => `${p}[0-9a-f]{${n}}`;
const VRC_ID_suffix = hex(8, "_") + hex(4).repeat(3) + hex(12);
const userIDPattern = new RegExp("usr" + VRC_ID_suffix);
const worldIDPattern = new RegExp("wrld" + VRC_ID_suffix);
const avatarIDPattern = new RegExp("avtr" + VRC_ID_suffix);

function LookFor(path: string, pattern: RegExp) {
  CustomProxy.Listen<User | World | Avatar>(
    ({ subPath }) => subPath.startsWith(path) && subPath.split("/").length === 2,
    (object) => {
      if (!object.id.match(pattern)) {
        new Audio("https://b.catgirlsare.sexy/cmx0XVUfUzC5.wav").play();
        console.log("Found object with unusual ID", object);
      }
    }
  );
}

LookFor("users", userIDPattern);
LookFor("worlds", worldIDPattern);
LookFor("avatars", avatarIDPattern);
}