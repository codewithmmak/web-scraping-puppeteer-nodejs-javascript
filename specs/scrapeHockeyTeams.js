const puppeteer = require('puppeteer');

let url = 'https://scrapethissite.com/pages/forms/';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(1000);

    // get Hockey Team details
    const team = await page.evaluate(() => {
        const getFromRow = (row, classname) => row.querySelector('td.${classname}').innerText.trim();

        const teamRowSelector = 'tr.team';

        const data = [];

        const teamRows = document.querySelectorAll(teamRowSelector);

        for (const tr of teamRows) {
            data.push({
                name: getFromRow(tr, 'name'),
                year: getFromRow(tr, 'year'),
                wins: getFromRow(tr, 'wins'),
                losses: getFromRow(tr, 'losses'),
            })
        };

        return data;

    });

    console.log(JSON.stringify(teams, null, 2));
})();