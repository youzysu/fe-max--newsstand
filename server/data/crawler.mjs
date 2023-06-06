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
  writeFile('./src/data/trendNews.json', jsonData);

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
        return { icon: el.src, name: el.alt };
      })
    );
    allNewsMedia.push(newsMedia);
    await page.click('.ContentPagingView-module__btn_next___ZBhby');
  }

  const jsonData = JSON.stringify(allNewsMedia.flat());
  writeFile('./newsMedia.json', jsonData);

  await browser.close();
};

export const getListViewData = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.naver.com/', { waitUntil: 'networkidle0' });

  const listViewerOptionSelector = '.ContentPagingView-module__btn_view_list___j7eNR';
  await page.click(listViewerOptionSelector);

  const categorySelector = '.MediaOptionView-module__option_item___JQyW2';
  const categories = await page.$$(categorySelector);

  const result = [];

  for (const category of categories) {
    await category.click();
    const categoryName = await category.$eval('span', (el) => el.textContent);
    const pressCount = await page.$eval(
      '.ContentPagingView-module__total___HUvt2',
      (el) => el.textContent.match(/\d+/)[0]
    );
    const articleArea = await page.$('.MediaNewsView-module__media_news___unhXU');
    const pressList = [];

    while (pressList.length < pressCount) {
      const pressInfo = await articleArea.$eval('.MediaNewsView-module__news_logo___MQbz7 > img', (el) => {
        return { icon: el.src, name: el.alt };
      });
      const lastEdited = await articleArea.$eval('.MediaNewsView-module__time___zS8dM', (el) => el.textContent);
      const thumbnail = await articleArea.$eval('.ImgView-module__content_img___QA0gl > img', (el) => {
        return { img: el.src, title: el.alt };
      });
      const mainArticle = await articleArea.$eval('.MediaNewsView-module__desc_title___s0li5', (el) => {
        return { title: el.textContent, link: el.href };
      });
      const subArticleList = await articleArea.$$eval('.MediaNewsView-module__link_item___XI2W1', (el) => {
        return el.map((item) => {
          return { title: item.textContent, link: item.href };
        });
      });
      pressList.push({ pressInfo, lastEdited, thumbnail, mainArticle, subArticleList });
      await page.click('.ContentPagingView-module__btn_next___ZBhby');

      // 다음 페이지 렌더링 시간을 고려하여 0.1초 대기 필요
      await page.waitForTimeout(100);
    }

    result.push({ categoryName, pressList });
  }

  await browser.close();

  const jsonData = JSON.stringify(result);
  writeFile('/server/data/listViewData.json', jsonData);
};
