import { QueryAgent } from '@datakit-dev/types/types/datakit/agents/queryAgent';
import { Context } from 'datakit/context'

async function runQuery(query: QueryAgent, sql: string): Promise<any[]> {
    const results = query.getResults(sql);
    return results.rows as any[];
}

export default (ctx: Context) => {
    const query = ctx.getAgent('query');
    if (!query) {
        throw new Error('Query agent not found');
    }

    const query1 = runQuery(query, "select count(*) as total_products from custom_file.products").then((results) => {
        console.log("Total Products: %s", results[0]['total_products']);
    });
    const query2 = runQuery(query, "select count(*) as total_words from custom_file_1.stopwords").then((results) => {
        console.log("Total Words: %s", results[0]['total_words']);
    });
    const query3 = runQuery(query, "select product_type, avg(variant.price) as avg_price from custom_file.products, unnest(variants) as variant group by product_type order by avg_price desc").then((results) => {
        console.log("Product Type | Average Price");
        console.log("-------------+--------------");
        for (const row of results) {
            console.log("%s | %s", row['product_type'], row['avg_price']);
        }
    });

    Promise.all([query1, query2, query3]).then(() => {
        console.log("All queries finished!");
    }).catch((error) => {
        console.error("Error:", error);
    });
};