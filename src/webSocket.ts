import { wsPromise } from "./proxy";

export default function run(){

function expand(obj: Object) : string[]{
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    // save key of primitives, array and null and expand the rest
    if (typeof value !== "object" || Array.isArray(value) || value === null) {
      keys.push(key);
    } else {
      expand(value).forEach((child) => keys.push(`${key}.${child}`));
    }
  }
  return keys;
}

function getMessageKey(type: string, content:string): string {
  const contentKeys = expand(content).sort().join();
  return `${type}+${contentKeys}`;
}

const request = indexedDB.open("martin", 1);
const messageStore = "ws_message";

request.onupgradeneeded = (_) => request.result.createObjectStore(messageStore);

const dbPromise: Promise<IDBDatabase> = new Promise((resolve, reject) => {
  request.onsuccess = (_) => resolve(request.result);
  request.onerror = reject;
});

Promise.all([dbPromise, wsPromise]).then(([db, socket]) => {
  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    const { type } = data;
    const content = JSON.parse(data.content);

    db
      .transaction(messageStore, "readwrite")
      .objectStore(messageStore)
      .add(content, getMessageKey(type, content)).onsuccess = (_) => {
      console.log("New entry for type", type);
      new Audio("https://b.catgirlsare.sexy/cmx0XVUfUzC5.wav").play();
    };
  });
});
}