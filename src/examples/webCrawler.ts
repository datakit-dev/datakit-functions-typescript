import { Context } from 'datakit/context'
// import http from 'datakit/http';
// import { printTree } from './httpRequest';

// async function fetch(url: string) {
//     const resp = await http.request("GET", url);
//     return resp.json();
// }

export default async (ctx: Context) => {
    const query = ctx.getAgent('query');
    if (!query) {
        throw new Error('Query agent not found');
    }

    try {
        const results = query?.getResults("select url from custom_file.products limit 10");
        const rows = results.rows as any[];
        for (const row of rows) {
            const { url } = row;
            const fetchUrl = `${url}.json`;
            console.log("Attempting to fetch:", fetchUrl);
            // const json = await fetch(fetchUrl);
            // printTree(json);
        }
    } catch (error) {
        console.error('Query Error:', error);
    }
};