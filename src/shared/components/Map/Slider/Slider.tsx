import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Region } from '../../../../shared/models/article.model';
import styles from './Slider.module.scss';

const getStartHendlerLeft = (startRegion: Region): number => {
  if (startRegion === 'pomeranian') return 0;
  if (startRegion === 'poland') return 33;
  if (startRegion === 'europe') return 67;
  if (startRegion === 'world') return 100;
  return 0;
};

interface Props {
  startRegion: Region;
  changeRegion: (region: Region) => void;
}

function Slider({ startRegion, changeRegion }: Props) {
  const main = document.getElementById('main');
  const handler = document.getElementById('handler');
  const startHandlerLeft = getStartHendlerLeft(startRegion);
  const [isHandlerMoving, setIsHandlerMoving] = useState<boolean>(false);
  const [handlerLeft, setHandlerLeft] = useState<number>(startHandlerLeft);
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [startPoint, setStartPoint] = useState<number | null>(null);
  const [realDistance, setRealDistance] = useState<number | null>(null);

  useEffect(() => {
    const slider = document.getElementById('slider');
    setSliderWidth(slider?.offsetWidth as number);
    setStartPoint(slider?.offsetLeft as number);
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', onHandlerUp);
    return () => {
      document.removeEventListener('mouseup', onHandlerUp);
    };
  }, [realDistance]);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [isHandlerMoving]);

  const onHandlerDown = () => {
    setIsHandlerMoving(true);
  };

  const onHandlerUp = () => {
    !_.isNil(main) && (main.style.cursor = 'default');
    !_.isNil(handler) && (handler.style.cursor = 'grab');
    setIsHandlerMoving(false);
    !_.isNil(realDistance) && handleRegionSelect(realDistance);
  };

  const handleRegionSelect = (distance: number) => {
    if (distance >= 0 && distance < 17) {
      setHandlerLeft(0);
      changeRegion('pomeranian');
    }
    if (distance >= 17 && distance < 50) {
      setHandlerLeft(33);
      changeRegion('poland');
    }
    if (distance >= 50 && distance < 84) {
      setHandlerLeft(67);
      changeRegion('europe');
    }
    if (distance >= 84 && distance <= 100) {
      setHandlerLeft(100);
      changeRegion('world');
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isHandlerMoving && !_.isNil(startPoint)) {
      !_.isNil(main) && (main.style.cursor = 'grabbing');
      !_.isNil(handler) && (handler.style.cursor = 'grabbing');
      const fromStart = e.x - startPoint;
      const persents = (100 * fromStart) / sliderWidth;
      if (persents >= 0 && persents <= 100) {
        setHandlerLeft(persents);
        setRealDistance(persents);
      }
    }
  };

  const onSliderClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!_.isNil(startPoint)) {
      const fromStart = e.pageX - startPoint;
      const persents = (100 * fromStart) / sliderWidth;
      if (persents >= 0 && persents <= 100) {
        handleRegionSelect(persents);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sliderBox} id="slider" onClick={onSliderClick}>
        <div className={styles.line}></div>
        <div
          className={styles.handler}
          id="handler"
          onMouseDown={onHandlerDown}
          style={{ left: `${handlerLeft}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Slider;
