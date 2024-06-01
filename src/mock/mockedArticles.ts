import { ArticleInterface } from "../store/articles/articlesTypes";

export const mockedArticles: ArticleInterface[] = [
  {
    id: '1',
    author: 'John Doe',
    title: 'Breaking News: Major Event Happening Now Across Multiple Locations Worldwide, Affecting Millions of People',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vehicula elit et justo consequat, at interdum lorem. Aliquam erat volutpat. Duis vulputate sapien id venenatis tincidunt. Integer non nibh vel ligula luctus tincidunt at eget justo. In hac habitasse platea dictumst. Phasellus luctus est ac urna sodales, et fermentum nulla facilisis. Cras vestibulum tempor velit, non vehicula dui cursus non. Praesent tincidunt sollicitudin nisl, nec facilisis lorem varius a. Suspendisse potenti. Mauris vestibulum enim at turpis vestibulum, et consequat dui volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis ex.',
    url: '/',
    urlToImage: './src/assets/mock/1.webp',
    publishedAt: '2024-05-21 19:03:22',
    // category: 'news',
    isTopHeadline: true,
  },
  {
    id: '2',
    author: 'Jane Smith',
    title: 'Tech Trends: The Latest Innovations and Technologies Transforming the World in 2024',
    description:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vehicula elit et justo consequat, at interdum lorem. Aliquam erat volutpat. Duis vulputate sapien id venenatis tincidunt. Integer non nibh vel ligula luctus tincidunt at eget justo. In hac habitasse platea dictumst. Phasellus luctus est ac urna sodales, et fermentum nulla facilisis. Cras vestibulum tempor velit, non vehicula dui cursus non. Praesent tincidunt sollicitudin nisl, nec facilisis lorem varius a. Suspendisse potenti. Mauris vestibulum enim at turpis vestibulum, et consequat dui volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis ex.',
    url: '/',
    urlToImage: './src/assets/mock/2.webp',
    publishedAt: '2024-05-20 11:13:52',
    // category: 'tech',
    isTopHeadline: false,
  },
  {
    id: '3',
    author: 'Alex Johnson',
    title: 'Sports Update: Major Sports Events and Highlights from Around the Globe, Bringing Fans Together',
    description:
      'Mauris non tempor quam, et lacinia sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vehicula elit et justo consequat, at interdum lorem. Aliquam erat volutpat. Duis vulputate sapien id venenatis tincidunt. Integer non nibh vel ligula luctus tincidunt at eget justo. In hac habitasse platea dictumst. Phasellus luctus est ac urna sodales, et fermentum nulla facilisis. Cras vestibulum tempor velit, non vehicula dui cursus non. Praesent tincidunt sollicitudin nisl, nec facilisis lorem varius a. Suspendisse potenti. Mauris vestibulum enim at turpis vestibulum, et consequat dui volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis ex.',
    url: '/',
    urlToImage: './src/assets/mock/3.webp',
    publishedAt: '2024-05-19 07:42:38',
    // category: 'sports',
    isTopHeadline: false,
  },
]
