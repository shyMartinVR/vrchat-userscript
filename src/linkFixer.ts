import { waitForElement } from "./global";

export default async function run() {
  const navbar = await waitForElement<HTMLDivElement>(".right-nav", 10000);
  const docs = navbar.firstElementChild as HTMLAnchorElement;
  docs.firstElementChild.textContent = "Docs";

  const logout = navbar.lastElementChild;
  logout.before(createLink("https://creators.vrchat.com/avatars/", "Avatars"));
  logout.before(createLink("https://creators.vrchat.com/worlds/", "Worlds"));
  logout.before(createLink("https://udonsharp.docs.vrchat.com/", "UdonSharp"));
}

function createLink(url: string, text: string): HTMLAnchorElement {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noreferrer";

  const h4 = document.createElement("h4");
  h4.textContent = text;
  a.append(h4);
  return a;
}
