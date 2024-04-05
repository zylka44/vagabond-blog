import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useArticles } from './useArticles';
import _ from 'lodash';

export function useFilteredArticles() {
  const { articles } = useArticles();
  const filteredArticlesIds: string[] = useSelector((state: RootState) => state.filteredArticles.ids);
  const filteredArticles =
    !_.isEmpty(filteredArticlesIds) && !_.isEmpty(articles)
      ? articles.filter((article) => filteredArticlesIds.includes(article.id))
      : [];

  return { filteredArticlesIds, filteredArticles };
}
