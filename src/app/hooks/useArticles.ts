import { useDispatch, useSelector } from 'react-redux';
import { Article, Chunk, ChunkType, NewArticle } from '../../shared/models/article.model';
import {
  addArticleAction,
  updateArticleAction,
  deleteArticleAction,
  getArticlesAction,
} from '../features/articles.slice';
import { RootState } from '../store';
import _ from 'lodash';
import { sampleUrl } from '../../shared/consts/GeneralConsts';

export function useArticles() {
  const dispatch = useDispatch();
  const articlesObj: { [key: string]: Article } = useSelector((state: RootState) => state.articles);
  const articles = Object.values(articlesObj);
  const publishedArticles = articles.filter((article) => article.publication?.published).reverse();

  const getArticles = () => dispatch(getArticlesAction());

  const getPublishedArticlesByTag = (tag: string) =>
    publishedArticles.filter((article) => {
      const tags = article.publication?.tags?.split(',');
      return tags?.includes(tag);
    });

  const selectArticleById = (id: string): Article => articlesObj[id];

  const addArticle = (newArticle: NewArticle) => {
    dispatch(addArticleAction(newArticle));
  };

  const updateArticle = (article: Article) => {
    dispatch(updateArticleAction(article));
  };

  const deleteArticle = (id: string) => {
    dispatch(deleteArticleAction(id));
  };

  const selectArticleChunks = (id: string, newChunkConfig?: { index: number; type: ChunkType }): Chunk[] => {
    let chunks = selectArticleById(id).chunks;
    if (!_.isNil(newChunkConfig) && !_.isNil(chunks)) {
      const { index, type } = newChunkConfig;
      const newChunk = {
        id: 'newChunk',
        type,
        text: '',
        pictures: [
          { id: '0', url: sampleUrl },
          { id: '1', url: sampleUrl },
        ],
        info: '',
      };
      const chs = _.cloneDeep(chunks);
      chs.splice(index, 0, newChunk);
      chunks = _.cloneDeep(chs);
    }
    return chunks ?? [];
  };

  return {
    articles,
    publishedArticles,
    getArticles,
    getPublishedArticlesByTag,
    selectArticleById,
    selectArticleChunks,
    addArticle,
    updateArticle,
    deleteArticle,
  };
}
