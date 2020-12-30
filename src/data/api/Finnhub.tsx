import { Finnhub } from '../../credentials/Finnhub';
import { toast } from '../../components/toast/Toast';
import { ToastStatus } from '../../enum/ToastStatus';
import { NewsType } from '../../enum/NewsType';
import { List } from '../../components/list/List';

// To use this one...
export function getNews(category: string = NewsType.GENERAL, minId: number = 10) {
  return fetch(`https://finnhub.io/api/v1/news?category=${category}&${minId}&token=${Finnhub.token}`)
    .then(response => response.json())
    .then(
      (result: any[]) => {
        const customList: List[] = [];
        result.forEach((item: any) => {
          const list: List = Object.assign({}, {
            category: item.category,
            id: item.id,
            image: item.image,
            alt: item.headline,
            headline: item.headline,
            summary: item.summary,
            url: item.url
          })
          customList.push(list);
        });

        return customList;
      },
      (error) => {
        toast(error.message, ToastStatus.ERROR, 4000);
        return null;
      }
    );
}

export function getNewsLocal(category: string = NewsType.GENERAL, minId: number = 10) {
  return new Promise((resolve, reject) => {
    const data: any[] = require('./local/news.json');

    // Get only data required for the list
    const customList: List[] = [];
    data.forEach((item: any) => {
      const list: List = Object.assign({}, {
        category: item.category,
        id: item.id,
        image: item.image,
        alt: item.headline,
        headline: item.headline,
        summary: item.summary,
        url: item.url,
      })
      customList.push(list);
    });

    if (customList) {
      resolve(customList);
    } else {
      resolve(null);
    }
  });
}
