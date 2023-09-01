import { Context } from 'datakit/context'

export default (ctx: Context) => {
    const query = ctx.getAgent('query');
    if (!query) {
        throw new Error('Query agent not found');
    }

    try {
        const results = query?.getResults("select id, url, title from custom_file.products limit 10");
        const rows = results.rows as any[];
        for (const row of rows) {
            console.log("%s %s %s", row['id'], row['url'], row['title']);
        }
    } catch (error) {
        console.error('Query Error:', error);
    }
};