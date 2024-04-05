import styles from './Map.module.scss';
import worldMap from '../../../assets/maps/worldMap.svg';
import europeMap from '../../../assets/maps/europeMap.svg';
import polandMap from '../../../assets/maps/polandMap.svg';
import pomeranianMap from '../../../assets/maps/pomeranianMap.svg';
import { useState } from 'react';
import Pin from './Pin/Pin';
import { Article, Region } from '../../../shared/models/article.model';
import Slider from './Slider/Slider';

interface Props {
  articles: Article[];
  onPinClick: (articleId: string) => void;
}

function Map({ articles, onPinClick }: Props) {
  const [region, setRegion] = useState<Region>('europe');
  const [placeName, setPlaceName] = useState<string>('');
  const [hoveredArticleId, setHoveredArticleId] = useState<string | null>(null);

  const changeRegion = (region: Region) => {
    setPlaceName('');
    setRegion(region);
  };

  const onPinOver = (articleId: string, name: string) => {
    setHoveredArticleId(articleId);
    setPlaceName(name);
  };

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        {region === 'world' && <img src={worldMap} alt="mapa świata" />}
        {region === 'europe' && <img src={europeMap} alt="mapa Europy" />}
        {region === 'poland' && <img src={polandMap} alt="mapa Polski" />}
        {region === 'pomeranian' && <img src={pomeranianMap} alt="mapa pomorza" />}
        {articles.map((article) => {
          const coordinates = article.publication?.coordinates;
          if (coordinates) {
            const splitedCoords = coordinates.split(',');
            const left = splitedCoords[0];
            const top = splitedCoords[1];
            const articleRegion = splitedCoords[2];
            if (articleRegion === region) {
              return (
                <Pin
                  key={article.id}
                  coordinates={{ top, left }}
                  label={article.title}
                  isPinHovered={hoveredArticleId === article.id}
                  onPinClick={() => onPinClick(article.id)}
                  onPinOver={() => onPinOver(article.id, article.title)}
                />
              );
            }
          }
        })}
      </div>
      <div className={styles.placeName}>{placeName.toUpperCase()}</div>
      <div className={styles.slider}>
        <Slider startRegion={region} changeRegion={changeRegion} />
      </div>
    </div>
  );
}

export default Map;
