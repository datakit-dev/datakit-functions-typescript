import { Context } from "datakit/context";
import sql from "datakit/sql";

export default ({ args }: Context) => {
    const query = /* SQL */ sql`
        SELECT url FROM custom_file.products ${args?.id ? "WHERE id = ${args.id}" : ""}
    `
    const { data } = query.execute();
    if (data && data.rows) {
        for (const row of data.rows) {
            console.log("%s %s %s", row['id'], row['url'], row['title']);
        }    
    }
};