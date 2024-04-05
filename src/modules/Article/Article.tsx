import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getArticleByIdAction } from '../../app/features/articles.slice';
import { useArticles } from '../../app/hooks/useArticles';
import TopMenu from '../../shared/components/TopMenu/TopMenu';
import styles from './Article.module.scss';
import _ from 'lodash';
import SubtitleView from '../../shared/components/ChunksViews/SubtitleView/SubtitleView';
import PicturesView from '../../shared/components/ChunksViews/PicturesView/PicturesView';
import ParagraphsView from '../../shared/components/ChunksViews/ParagraphsView/ParagraphsView';
import { useSession } from '../../app/hooks/useSession';
import Footer from '../../shared/components/Footer/Footer';
import { useModals } from '../../app/hooks/useModals';
import ScrollButton from '../../shared/components/ScrollButton/ScrollButton';

function Article() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSession();
  const { openModal } = useModals();
  const { articles, selectArticleById } = useArticles();
  const { articleId } = useParams<{ articleId: string }>();
  const article = selectArticleById(articleId);

  useEffect(() => {
    if (!articles.some((a) => a.id === articleId)) {
      history.push(`/`);
    }
    dispatch(getArticleByIdAction(articleId));
  }, [articleId]);

  const onSearchClick = () => {
    openModal('search');
  };

  const onMapLinkClick = () => {
    openModal('map');
  };

  const backToMain = () => {
    history.push(`/`);
  };

  const onEditClick = () => {
    if (isLoggedIn) {
      history.push(`/edit/${articleId}`);
    } else {
      openModal('login');
    }
  };

  return (
    <div className={styles.container}>
      <TopMenu
        logoOnClick={backToMain}
        middleItems={[
          { key: 'mapa', label: 'Mapa', onClick: onMapLinkClick },
          { key: 'ostronie', label: 'O stronie', onClick: () => console.log('o stronie') },
          { key: 'search', label: 'Wyszukaj', onClick: onSearchClick },
        ]}
        rightItems={
          isLoggedIn
            ? [{ key: 'edit', label: 'Edytuj', iconType: 'edit', onClick: onEditClick }]
            : [{ key: 'zaloguj', label: 'Zaloguj', iconType: 'account', onClick: onEditClick }]
        }
      />
      <div className={styles.mainPicture} style={{ backgroundImage: `url(${article.mainPictureUrl})` }}></div>
      <div className={styles.body}>
        <div className={styles.articleHeader}>
          <div className={styles.title}>{article?.title}</div>
          {!_.isEmpty(article.date) && <div className={styles.date}>{article.date}</div>}
        </div>
        <div className={styles.chunks}>
          {article?.chunks?.map((chunk) => {
            const { type, text = '', pictures = [] } = chunk;
            return (
              <div key={chunk.id} className={styles.chunk}>
                {type === 'subtitle' && <SubtitleView text={text} />}
                {(type === 'paragraph' || type === 'paragraph-picture' || type === 'picture-paragraph') && (
                  <ParagraphsView type={type} text={text} pictures={pictures} />
                )}
                {(type === 'picture' || type === 'picture-double') && <PicturesView type={type} pictures={pictures} />}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
      <ScrollButton />
    </div>
  );
}

export default Article;
