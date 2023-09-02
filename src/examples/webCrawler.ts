import { FunctionProps } from 'datakit/function';
// import http from 'datakit/http';

export default ({ ctx }: FunctionProps) => {
    const query = ctx.getAgent('query');
    if (!query) {
        throw new Error('Query agent not found');
    }

    const results = query?.getResults("select url from custom_file.products limit 10");
    const rows = results.rows as any[];
    for (const row of rows) {
        const { url } = row;
        const fetchUrl = `${url}.json`;
        console.log("Attempting to fetch:", fetchUrl);
        // const resp = http.get(fetchUrl);
        // console.log(resp.json());
    }
};