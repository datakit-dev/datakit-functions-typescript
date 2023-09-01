export default () => {
    console.log("Hello DataKit!")

    setTimeout(() => {
        console.warn("Here's a warning message.");
    }, 1000);

    setTimeout(() => {
        console.debug("Here's a debug message.");
    }, 1500);

    setTimeout(() => {
        console.error("Here's an error message.");
    }, 2000);
};