async function main() {
    try {
        const response = await fetch("https://api.unsplash.com/search/photos/?client_id=_pct40oKgkG3fwzKAMAnYNVXm_xBBz8YiD-SSAbmTwk&query=cat");

        const result = await response.json();

        console.log(result.results[0].urls.full);
    } catch (error) {
        console.error("Faild to fetch");
    }
}

main();
