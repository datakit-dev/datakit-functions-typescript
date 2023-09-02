import http, { HttpMethod, Params } from 'datakit/http';

const urls: {[key: string]: {
    method: HttpMethod,
    params: Params,
    body: {
        json: {[key: string]: string}
    } | null
}
} = {
    "https://httpbin.org/get": {
        method: "GET",
        params: {
            headers: {
                
            }
        },
        body: null
    },
    "https://httpbin.org/post": {
        method: "POST",
        params: {
            headers: {
                
            }
        },
        body: {
            json: {
                "foo": "bar"
            }
        }
    },
    "https://httpbin.org/put": {
        method: "PUT",
        params: {
            headers: {
                
            }
        },
        body: {
            json: {
                "foo": "baz"
            }
        }
    },
    "https://httpbin.org/delete": {
        method: "DELETE",
        params: {
            headers: {
                
            }
        },
        body: {
            json: {
                "foo": "bar"
            }
        }
    },
};

export default () => {
    for (const [url, config] of Object.entries(urls)) {
        console.log("Attempting to fetch:", url);
        const { method, params, body } = config;

        try {
            const resp = http.request(method, url, body, params);
            if (typeof resp.body === 'object') {
                console.log("JSON:", JSON.stringify(resp.body, null, 2));
            } else {
                console.log("Text:", resp.body);

            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};