import styles from './SearchModal.module.scss';
import Modal from '../Modal';
import Input from '../../Input/Input';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { useFilteredArticles } from '../../../../app/hooks/useFilteredArticles';
import { filterArticlesAction } from '../../../../app/features/filteredArticles.slice';
import { useHistory } from 'react-router-dom';
import { useModals } from '../../../../app/hooks/useModals';
import TripBox from '../../TripBox/TripBox';
import { SearchModalConfig, TripType } from '../../../models/article.model';
import CheckBox from '../../CheckBox/CheckBox';

const TRIP_TYPES_TRANSLATION: { tripType: TripType; translation: string }[] = [
  { tripType: 'hiking', translation: 'na piechotę' },
  { tripType: 'bike', translation: 'na rowerze' },
  { tripType: 'faraway', translation: 'daleko' },
];

function SearchModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { modalConfig, closeModal } = useModals();
  const { filteredArticles } = useFilteredArticles();
  const [filteringText, setFilteringtext] = useState<string>('');
  const [selectedTripTypes, setSelectedTripTypes] = useState<TripType[]>([]);

  const onSearchChange = (filteringText: string, selectedTripTypes: TripType[]): void => {
    dispatch(filterArticlesAction({ filteringText, selectedTripTypes }));
  };

  const debounceOnSearchChange = _.debounce(onSearchChange, 300);

  useEffect(() => {
    const { tripType } = modalConfig as SearchModalConfig;
    !_.isNil(modalConfig) && !_.isNil(tripType) && setSelectedTripTypes([tripType]);
  }, []);

  useEffect(() => {
    const tooShort = filteringText.length > 0 && filteringText.length < 3;
    !tooShort && debounceOnSearchChange(filteringText, selectedTripTypes);
  }, [filteringText, selectedTripTypes]);

  const filterArticles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteringtext(e.target.value);
  };

  const onTitleSelect = (articleId: string) => {
    onCloseClick();
    history.push(`/article/${articleId}`);
  };

  const onCloseClick = () => {
    closeModal();
  };

  const onCheckboxChange = (tripType: TripType) => {
    const isAlreadySelected = selectedTripTypes.includes(tripType);
    setSelectedTripTypes(
      isAlreadySelected ? selectedTripTypes.filter((tT) => tT !== tripType) : [...selectedTripTypes, tripType]
    );
  };

  return (
    <div className={styles.mainContainer}>
      <Modal onCloseClick={onCloseClick} fullpage>
        <div className={styles.container}>
          <Input
            name="filteringText"
            value={filteringText}
            placeholder="wyszukaj"
            width="540px"
            onChange={filterArticles}
          />
          <div className={styles.tripTypes}>
            {TRIP_TYPES_TRANSLATION.map((tripTypeTranslation) => {
              const { tripType, translation } = tripTypeTranslation;
              return (
                <div key={tripType} className={styles.tripType}>
                  <CheckBox
                    label={translation}
                    onChange={() => onCheckboxChange(tripType)}
                    selected={selectedTripTypes.includes(tripType)}
                  />
                </div>
              );
            })}
          </div>
          {!_.isEmpty(filteredArticles) ? (
            <div className={styles.results}>
              {_.reverse(filteredArticles).map((article) => {
                const onTripClick = () => onTitleSelect(article.id);
                return <TripBox key={article.id} article={article} onTripClick={onTripClick} />;
              })}
            </div>
          ) : (
            <div className={styles.noResult}>brak wyników wyszukiwania...</div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default SearchModal;
