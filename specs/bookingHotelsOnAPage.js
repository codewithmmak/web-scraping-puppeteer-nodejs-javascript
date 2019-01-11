const puppeteer = require('puppeteer');

// Update the URL
let bookingUrl = 'https://www.booking.com/searchresults.en-us.html?aid=397594&label=gog235jc-1DCAEoggI46AdIM1gDaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgM&sid=67efa6cdefa43c279c0a79910a35e516&sb=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.html%3Faid%3D397594%3Blabel%3Dgog235jc-1DCAEoggI46AdIM1gDaGyIAQGYATG4ARfIAQzYAQPoAQH4AQKIAgGoAgM%3Bsid%3D67efa6cdefa43c279c0a79910a35e516%3Bsb_price_type%3Dtotal%26%3B&ss=Noida%2C+Delhi+NCR%2C+India&is_ski_area=&checkin_month=&checkin_monthday=&checkin_year=&checkout_month=&checkout_monthday=&checkout_year=&no_rooms=1&group_adults=2&group_children=0&b_h4u_keep_filters=&from_sf=1&ss_raw=Noida&ac_position=0&ac_langcode=en&ac_click_type=b&dest_id=900048213&dest_type=city&place_id_lat=28.5354&place_id_lon=77.390999&search_pageview_id=c4ab51ca648700f1&search_selected=true';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(bookingUrl);
    await page.waitFor(1000);

    // get hotels details
    let hotelData = await page.evaluate(() => {
        let hotels = [];
        // get the hotel elements
        let hotelsElms = document.querySelectorAll('div.sr_property_block[data-hotelid]');
        // get the hotel data
        hotelsElms.forEach((hotelelement) => {
            let hotelJson = {};
            try {
                hotelJson.name = hotelelement.querySelector('span.sr-hotel__name').innerText;
                hotelJson.reviews = hotelelement.querySelector('span.review-score-widget__subtext').innerText;
                hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
                if (hotelelement.querySelector('strong.price')) {
                    hotelJson.price = hotelelement.querySelector('strong.price').innerText;
                }
            }
            catch (exception) {

            }
            hotels.push(hotelJson);
        });
        return hotels;
    });

    console.dir(hotelData);
})();