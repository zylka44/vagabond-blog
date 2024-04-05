import { useHistory } from 'react-router-dom';
import { useArticles } from '../../app/hooks/useArticles';
import styles from './Main.module.scss';
import { useSession } from '../../app/hooks/useSession';
import Footer from '../../shared/components/Footer/Footer';
import TopMenu from '../../shared/components/TopMenu/TopMenu';
import NavigationSlider from './NavigationSlider/NavigationSlider';
import Follow from './Follow/Follow';
import MainSection from './MainSection/MainSection';
import { SECTIONS } from '../../shared/consts/Sections';
import { IconType } from '../../shared/consts/IconsTypes';
import { useModals } from '../../app/hooks/useModals';
import Hero from './Hero/Hero';
import { Article, TripType } from '../../shared/models/article.model';

function Main() {
  const history = useHistory();
  const { isLoggedIn } = useSession();
  const { publishedArticles } = useArticles();
  const { openModal } = useModals();

  const onMapLinkClick = () => {
    openModal('map');
  };

  const onSearchClick = (tripType?: TripType) => {
    openModal('search', { tripType });
  };

  const onEditClick = () => {
    if (isLoggedIn) {
      history.push(`/edit`);
    } else {
      openModal('login');
    }
  };

  const goToArticle = (articleId: string) => {
    history.push(`/article/${articleId}`);
  };

  const topMenuItems = {
    middleItems: [
      { key: 'mapa', label: 'Mapa', onClick: onMapLinkClick },
      { key: 'ostronie', label: 'O stronie', onClick: () => console.log('o stronie') },
      { key: 'search', label: 'Wyszukaj', onClick: () => onSearchClick() },
    ],
    rightItems: isLoggedIn
      ? [{ key: 'edit', label: 'Edytuj', iconType: 'edit' as IconType, onClick: onEditClick }]
      : [{ key: 'zaloguj', label: 'Zaloguj', iconType: 'account' as IconType, onClick: onEditClick }],
  };

  const getLastTrips = (tripType: TripType): Article[] =>
    publishedArticles.filter((a) => a.publication?.tags?.includes(tripType)).slice(0, 3);

  return (
    <div id="main">
      <TopMenu middleItems={topMenuItems.middleItems} rightItems={topMenuItems.rightItems} />
      <NavigationSlider />
      <Follow />

      <div className={styles.body}>
        <div id={'start'}>
          <Hero />
        </div>
        {SECTIONS.map((section, index) => {
          const lastArticles = getLastTrips(section.tripKind);
          return (
            <MainSection
              key={section.tripKind}
              index={index}
              {...section}
              lastArticles={lastArticles}
              onLastTripClick={goToArticle}
              onMoreTripsClick={() => onSearchClick(section.tripKind)}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default Main;
