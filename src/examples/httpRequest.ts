import http from 'datakit/http';

export default () => {
    console.log("Attempting to fetch https://www.google.com/...");

    try {
        const resp = http.get("https://www.google.com/");
        console.log("Response Status: %s", resp.status);
        console.log("Response Body: %s", resp.body);
    } catch (error) {
        console.error("Error:", error);
    }
};