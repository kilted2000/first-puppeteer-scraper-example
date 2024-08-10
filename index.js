import puppeteer from "puppeteer";

 const getTexts = async () => {
//   // Start a Puppeteer session with:
//   // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
//   // - no default viewport (`defaultViewport: null` - website page will be in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

//   // Open a new page
   const page = await browser.newPage();

//   // On this new page:
//   // - open the "http://quotes.toscrape.com/" website
//   // - wait until the dom content is loaded (HTML is ready)
   await page.goto("https://scotlandtrip2022.netlify.app/", {
    waitUntil: "domcontentloaded",
  });

//   // Get page data
  const texts = await page.evaluate(() => {
//     // Fetch the first element with class "quote"
//     // Get the displayed text and returns it
   const textList = document.querySelectorAll(".card-body");

//     // Convert the quoteList to an iterable array
//     // For each quote fetch the text and author
    return Array.from(textList).map((text) => {
//       // Fetch the sub-elements from the previously fetched quote element
//       // Get the displayed text and return it (`.innerText`)
     //const fullName = staff.querySelector(".fullname").innerText;
      const label = text.querySelector(".card-text").innerText;

     return { label };
    });
  });

//   // Display the quotes
   console.log(texts);

//     // Click on the "Next page" button
//     //await page.click(".pager > .next > a");
//   // Close the browser
  await browser.close();
 };

// // Start the scraping
 getTexts();