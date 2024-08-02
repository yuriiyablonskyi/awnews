import { ArticleInterface } from '../store/articles/articlesTypes'

export const mockedArticles: ArticleInterface[] = [
  {
    id: '1',
    isCustomArticle: true,
    title: 'Breaking News: Major Event Happening Now Across Multiple Locations Worldwide, Affecting Millions of People',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis ex. Vestibulum primis in" +
      "faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consecteiscing elit." +
      " Pellentesque eget venenatis ex.",
    urlToImage: './src/assets/mock/1.webp',
    publishedAt: '2024-05-21 19:03:22',
    isHotNews: true,
  },
  {
    id: '2',
    isCustomArticle: true,
    title: 'Tech Trends: The Latest Innovations and Technologies Transforming the World in 2024',
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec elit et " +
      "justo consequat, at interdum lorem. Aliquam erat volutpat. Praesent tincidunt sollicitudin nisl, nec facilisis" +
      " lorem varius a. Pellentesque eget venenatis ex.",
    urlToImage: './src/assets/mock/2.webp',
    publishedAt: '2024-05-20 11:13:52',
    isHotNews: false,
  },
  {
    id: '3',
    isCustomArticle: true,
    title: 'Sports Update: Major Sports Events and Highlights from Around the Globe, Bringing Fans Together',
    description:
      "Mauris non tempor quam, et lacinia sapien. Vestibulum ante ipsum primis in faucibus orci luctus et " +
      "ultrices posuere cubilia curae; Donec vehicula elit et justo consequat, at interdum lorem. Aliquam " +
      "erat volutpat. Consectetur adipiscing elit. Pellentesque eget venenatis ex.",
    urlToImage: './src/assets/mock/3.webp',
    publishedAt: '2024-05-19 07:42:38',
    isHotNews: false,
  },
]
