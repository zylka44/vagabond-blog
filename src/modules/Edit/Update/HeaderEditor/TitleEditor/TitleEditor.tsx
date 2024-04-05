import { useForm } from '../../../../../app/hooks/useForm';
import Input from '../../../../../shared/components/Input/Input';
import styles from './TitleEditor.module.scss';
import Action from '../../../../../shared/components/Action/Action';

interface Props {
  title: string;
  date: string;
  mainPictureUrl: string;
  coordinates: string;
  tags: string;
  published: boolean;
  updateTitle: (
    newTitle: string,
    newDate: string,
    newMainPictureUrl: string,
    newCoordinates: string,
    newTags: string,
    newPublicationState: boolean
  ) => void;
}

function TitleEditor({ title, date, mainPictureUrl, coordinates, tags, published, updateTitle }: Props) {
  const { values, handleChange } = useForm<{
    title: string;
    date: string;
    mainPictureUrl: string;
    coordinates: string;
    tags: string;
  }>({ title, date, mainPictureUrl, coordinates, tags });

  const onSaveClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    updateTitle(values.title, values.date, values.mainPictureUrl, values.coordinates, values.tags, published);
  };

  const onEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateTitle(values.title, values.date, values.mainPictureUrl, values.coordinates, values.tags, published);
    }
  };

  return (
    <div className={styles.container} onKeyDown={onEnterPress}>
      <div className={styles.editor}>
        <Input name={'title'} value={values.title} onChange={handleChange} placeholder={'nazwa'} noBorder uppercase />
        <div className={styles.info}>
          <div className={styles.date}>
            <Input name={'date'} value={values.date} onChange={handleChange} placeholder={'data'} noBorder />
            <Input
              name={'mainPictureUrl'}
              value={values.mainPictureUrl}
              onChange={handleChange}
              placeholder={'główne zdjęcie'}
              noBorder
            />
            <Input
              name={'coordinates'}
              value={values.coordinates}
              onChange={handleChange}
              placeholder={'współrzędne: x,y,region'}
              noBorder
            />
            <Input name={'tags'} value={values.tags} onChange={handleChange} placeholder={'tagi'} noBorder />
          </div>
        </div>
      </div>
      <div className={styles.save}>
        <Action type="ok" onClick={onSaveClick} size="s" />
      </div>
    </div>
  );
}

export default TitleEditor;
