import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useArticles } from '../../app/hooks/useArticles';
import _ from 'lodash';
import styles from './Edit.module.scss';
import TopMenu from '../../shared/components/TopMenu/TopMenu';
import Update from './Update/Update';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../app/features/session.slice';
import Footer from '../../shared/components/Footer/Footer';
import { IconType } from '../../shared/consts/IconsTypes';
import { useModals } from '../../app/hooks/useModals';
import ArticlesList from './ArticlesList/ArticlesList';

function Edit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { openModal } = useModals();
  const { articles } = useArticles();
  const { articleId } = useParams<{ articleId: string }>();

  useEffect(() => {
    if (!_.isEmpty(articleId) && !articles.some((a) => a.id === articleId)) {
      history.push(`/edit`);
    }
  }, []);

  const onListClick = () => {
    history.push(`/edit`);
  };

  const onMapLinkClick = () => {
    openModal('map');
  };

  const onPreviewClick = () => {
    history.push(`/article/${articleId}`);
  };

  const backToMain = () => {
    history.push(`/`);
  };

  const logout = () => {
    backToMain();
    dispatch(logoutAction());
  };

  return (
    <div className={styles.container}>
      <TopMenu
        logoOnClick={backToMain}
        middleItems={[
          { key: 'mapa', label: 'Mapa', onClick: onMapLinkClick },
          { key: 'ostronie', label: 'O stronie', onClick: () => console.log('o stronie') },
          { key: 'list', label: 'Lista', onClick: onListClick },
        ]}
        rightItems={
          !_.isEmpty(articleId)
            ? [{ key: 'podglad', label: 'Podgląd', iconType: 'preview' as IconType, onClick: onPreviewClick }]
            : [{ key: 'wyloguj', label: 'Wyloguj', iconType: 'logout', onClick: logout }]
        }
      />
      {_.isEmpty(articleId) ? <ArticlesList /> : <Update articleId={articleId} />}
      <Footer />
    </div>
  );
}

export default Edit;
