import http, { HttpMethod, Params } from 'datakit/http';

const urls: {[key: string]: {
    method: HttpMethod,
    params?: Params,
    body?: {
        json: {[key: string]: string}
    } | null
}
} = {
    "https://httpbin.org/get": {
        method: "GET",
    },
    "https://httpbin.org/post": {
        method: "POST",
        body: {
            json: {
                "foo": "bar"
            }
        }
    },
    "https://httpbin.org/put": {
        method: "PUT",
        body: {
            json: {
                "foo": "baz"
            }
        }
    },
    "https://httpbin.org/delete": {
        method: "DELETE",
        body: {
            json: {
                "foo": "bar"
            }
        },
        params: {
            headers: {
                "Content-Type": "application/json"
            },
        }
    },
};

export function printTree(obj: any, indent: number = 0) {
    for (const [key, value] of Object.entries(obj)) {
        console.log("%s%s: %s", " ".repeat(indent), key, value);
        if (value && typeof value === "object") {
            printTree(value, indent + 2);
        }
    }
}

export default () => {
    for (const [url, config] of Object.entries(urls)) {
        console.log("Attempting to fetch:", url);
        const { method, params, body } = config;

        try {
            const resp = http.request(method, url, body, params);
            console.log("Status:", resp.status);
            const json = resp.json();
            if (typeof json === "object") {
                console.log("JSON:");
                printTree(json);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};