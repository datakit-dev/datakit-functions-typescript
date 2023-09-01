import { Context } from 'datakit/context'
import logging from './logging';
import getQueryResults from './getQueryResults';

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async (ctx: Context) => {
    console.log("Running logging function...");
    logging();

    console.log("Sleeping for 10 seconds...");
    await sleep(10000);

    console.log("Running getQueryResults function...");
    getQueryResults(ctx);
};