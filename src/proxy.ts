type Filter = (url: API_URL) => boolean;
type Callback<T> = (data: T) => any;
type Listener<T> = { filter: Filter; callback: Callback<T> };

export class API_URL extends URL {
  subPath: string;
  constructor(url: string) {
    super(url);
    this.subPath = this.pathname.substring(7);
  }

  static fromFragment = (url: string) => new API_URL(`${API_URL.apiBase}${url}`);
  static fromUrl = (url: URL) => new API_URL(url.href);
  static apiBase = "https://vrchat.com/api/1/";
}

export class CustomProxy {
  static listeners: Listener<any>[] = [];
  static Listen<T>(filter: Filter, callback: Callback<T>) {
    CustomProxy.listeners.push({ filter, callback });
  }
}

export class CustomFetch {
  static fetch = window.fetch;
  static async handleFetch(input: RequestInfo | URL, init?: RequestInit) {
    const promise = CustomFetch.fetch(input, init);
    // @ts-ignore
    if (!input.url.startsWith(API_URL.apiBase)) return promise;
    // @ts-ignore
    const url = new API_URL(input.url);
    for (const { filter, callback } of CustomProxy.listeners)
      if (filter(url))
        promise.then((response) => response.clone().json().then(callback));

    return promise;
  }
}

export class CustomXHR extends XMLHttpRequest {
  // @ts-ignore
  open(method: string, url: string | URL, async: boolean, username?: string, password?: string): void {
    super.open(method, url, async, username, password);
    if (!(url instanceof URL)) url = new URL(url);
    
    if (url.href.startsWith(API_URL.apiBase)) {
      // @ts-ignore
      url = new API_URL(url);
      for (const { filter, callback } of CustomProxy.listeners) {
        // @ts-ignore
        if (filter(url)) {
          this.addEventListener("load", (_) => {
            callback(JSON.parse(this.responseText));
          });
        }
      }
    }
  }
}

export const wsPromise: Promise<WebSocket> = new Promise((resolve) => {
  const realSocket = window.WebSocket;
  // @ts-ignore
  unsafeWindow.WebSocket = function (url, protcols) {
    const socket = new realSocket(url, protcols);
    resolve(socket);
    return socket;
  };
});

export default function run(){
// @ts-ignore
unsafeWindow.fetch = CustomFetch.handleFetch;

// @ts-ignore
unsafeWindow.XMLHttpRequest = CustomXHR;
}


