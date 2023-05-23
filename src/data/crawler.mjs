import { writeFile } from 'fs/promises';
import puppeteer from 'puppeteer';

const getTrendNews = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto('https://www.naver.com/', { waitUntil: 'networkidle0' });
  const trendNewsData = [];

  while (trendNewsData.length < 10) {
    await page.waitForTimeout(3000);
    const newsMediaSelector = '.ContentHeaderSubView-module__news_media___YJm6A';
    const newsTitleSelector = '.ContentHeaderSubView-module__news_title___wuetX';
    const newsLinkSelector = '.ContentHeaderSubView-module__news_title___wuetX > a';

    const newsMedia = await page.$eval(newsMediaSelector, (el) => el.textContent);
    const newsTitle = await page.$eval(newsTitleSelector, (el) => el.textContent);
    const newsLink = await page.$eval(newsLinkSelector, (el) => el.href);

    trendNewsData.push({
      index: trendNewsData.length,
      media: newsMedia,
      title: newsTitle,
      link: newsLink,
    });
  }

  const jsonData = JSON.stringify(trendNewsData);
  writeFile('./src/data/trendNews.json', jsonData, (err) => {
    if (err) throw err;
  });

  await browser.close();
};

const getMediaBrandIcon = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.naver.com/', { waitUntil: 'networkidle0' });

  const newsMediaSelector = '.MediaSubscriptionView-module__news_thumb___UDmow > img';
  const allNewsMedia = [];

  while (allNewsMedia.length < 4) {
    const newsMedia = await page.$$eval(newsMediaSelector, (elements) =>
      elements.map((el) => {
        return { src: el.src, alt: el.alt };
      })
    );
    allNewsMedia.push(newsMedia);
    await page.click('.ContentPagingView-module__btn_next___ZBhby');
  }

  const jsonData = JSON.stringify(allNewsMedia.flat());
  writeFile('./src/data/newsMedia.json', jsonData, (err) => {
    if (err) throw err;
  });

  await browser.close();
};
