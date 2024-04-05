import _ from 'lodash';
import styles from './ArticlesList.module.scss';
import { Article, ConfirmModalConfig, NewArticle, Publication } from '../../../shared/models/article.model';
import Action from '../../../shared/components/Action/Action';
import Input from '../../../shared/components/Input/Input';
import { useHistory } from 'react-router-dom';
import { useArticles } from '../../../app/hooks/useArticles';
import { useModals } from '../../../app/hooks/useModals';
import { useState } from 'react';
import { useForm } from '../../../app/hooks/useForm';
import classNames from 'classnames';
import Image from '../../../shared/components/Image/Image';
import { sampleUrl } from '../../../shared/consts/GeneralConsts';

function ArticlesList() {
  const history = useHistory();
  const { articles, addArticle, deleteArticle, selectArticleById, updateArticle } = useArticles();
  const { openModal } = useModals();
  const { values, handleChange } = useForm<{ title: string; mainPictureUrl: string }>({
    title: '',
    mainPictureUrl: '',
  });
  const [isNewCreatorOpened, setIsNewCreatorOpened] = useState<boolean>(false);

  const onArticleNameClick = (articleId: string) => {
    history.push(`/edit/${articleId}`);
  };

  const onArticlePublishClick = (event: React.MouseEvent<HTMLElement>, articleId: string) => {
    event.stopPropagation();
    const article = selectArticleById(articleId);
    const publication: Publication = {
      ...article.publication,
      published: !article.publication?.published,
    };
    const updatedArticle: Article = {
      ...article,
      publication,
    };
    updateArticle(updatedArticle);
  };

  const onPreviewClick = (event: React.MouseEvent<HTMLElement>, articleId: string) => {
    event.stopPropagation();
    history.push(`/article/${articleId}`);
  };

  const onArticleDeleteClick = (event: React.MouseEvent<HTMLElement>, articleId: string) => {
    event.stopPropagation();
    const articleToRemove = selectArticleById(articleId);
    const config: ConfirmModalConfig = {
      text: `Czy na pewno chcesz usunąć artykuł "${articleToRemove.title}"?`,
      onConfirm: () => deleteArticle(articleId),
    };
    openModal('confirm', config);
  };

  const addNew = () => {
    const article: NewArticle = { title: values.title, mainPictureUrl: values.mainPictureUrl };
    addArticle(article);
    setIsNewCreatorOpened(false);
  };

  const onNewButtonClick = () => {
    setIsNewCreatorOpened(true);
  };

  return (
    <div className={styles.articlesList}>
      {articles.map((article) => (
        <div
          key={article.id}
          className={classNames(styles.article, { [styles.notPublished]: !article.publication?.published })}
          onClick={() => onArticleNameClick(article.id)}
        >
          <div className={styles.picture}>
            <Image src={article.mainPictureUrl || sampleUrl} alt={'main picture'} />
          </div>
          <div className={styles.info}>
            <div className={styles.title}>{article.title}</div>
            <div className={styles.date}>{article.date}</div>
          </div>
          <div className={styles.actions}>
            <Action
              type={article.publication?.published ? 'eye' : 'eyeCrossed'}
              onClick={(event) => onArticlePublishClick(event, article.id)}
              size="s"
            />
            <Action type="preview" onClick={(event) => onPreviewClick(event, article.id)} size="s" />
            <Action type="delete" onClick={(event) => onArticleDeleteClick(event, article.id)} size="s" />
          </div>
        </div>
      ))}
      {isNewCreatorOpened ? (
        <div className={styles.newCreator}>
          <Input name={'title'} value={values.title} onChange={handleChange} placeholder="tytuł" noBorder />
          <Input
            name={'mainPictureUrl'}
            value={values.mainPictureUrl}
            onChange={handleChange}
            placeholder="główne zdjęcie"
            noBorder
          />
          <div className={styles.actionOK}>
            <Action type="ok" onClick={addNew} size={'s'} />
          </div>
        </div>
      ) : (
        <div className={styles.addAction} onClick={onNewButtonClick}>
          +
        </div>
      )}
    </div>
  );
}

export default ArticlesList;
