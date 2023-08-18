import { wsPromise } from "./proxy";

export async function waitForElement<T extends Element>(selector: any, timeout?: number): Promise<T> {
  return new Promise((resolve, reject) => {
    {
      const element = document.querySelector(selector);
      if (element) {
        return resolve(element);
      }
    }
    const observer = new MutationObserver((_) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    if (timeout) {
      setTimeout(() => {
        reject("timed out!");
        observer.disconnect();
      }, timeout);
    }
  });
}

export default function run(){

const pushState = window.history.pushState;
const replaceState = window.history.replaceState;

window.addEventListener("popstate", (_) => {
  PathChangeEvent.dispatch(location.pathname);
});

window.history.pushState = (data, unused, url?: string) => {
  PathChangeEvent.dispatch(url);
  pushState.call(history, data, unused, url);
};

window.history.replaceState = (data, unused, url?: string) => {
  PathChangeEvent.dispatch(url);
  replaceState.call(history, data, unused, url);
};

wsPromise.then((_) => PathChangeEvent.dispatch(location.pathname));

}

export class PathChangeEvent extends Event {
  pathname: string;
  subPath: string;
  constructor(pathname: string) {
    super("pathchange");
    this.pathname = pathname;
    this.subPath = pathname.substring(6);
  }

  static dispatch(pathname?: string) {
    if (pathname === undefined) return;
    const event = new PathChangeEvent(pathname);
    window.dispatchEvent(event);
  }
}

declare global{
  interface Window{
    addEventListener<K extends keyof CustomEventMap>(type: K, listener: (this:Window, event: CustomEventMap[K]) => void): void;
  }
}

interface CustomEventMap extends WindowEventHandlersEventMap{
  pathchange: PathChangeEvent
}