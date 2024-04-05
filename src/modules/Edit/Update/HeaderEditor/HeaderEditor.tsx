import { useState } from 'react';
import styles from './HeaderEditor.module.scss';
import TitleEditor from './TitleEditor/TitleEditor';
import TitleView from './TitleView/TitleView';
import classNames from 'classnames';

interface Props {
  title: string;
  date?: string;
  mainPictureUrl?: string;
  published?: boolean;
  coordinates?: string;
  tags?: string;
  updateHeader: (
    newTitle: string,
    newDate: string,
    newMainPictureUrl: string,
    newCoordinates: string,
    newTags: string,
    newPublicationState: boolean
  ) => void;
}

function HeaderEditor({ title, date, mainPictureUrl, published, coordinates, tags, updateHeader }: Props) {
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const handleEdited = () => {
    setIsEdited(true);
  };

  const updateTitle = (
    newTitle: string,
    newDate: string,
    newMainPictureUrl: string,
    newCoordinates: string,
    newTags: string,
    newPublicationState: boolean
  ) => {
    updateHeader(newTitle, newDate, newMainPictureUrl, newCoordinates, newTags, newPublicationState);
    setIsEdited(false);
  };

  const onArticlePublishClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    updateHeader(title, date || '', mainPictureUrl || '', coordinates || '', tags || '', !published);
  };

  return (
    <div className={classNames(styles.container, { [styles.isEdited]: isEdited })} onClick={handleEdited}>
      {isEdited ? (
        <TitleEditor
          title={title}
          date={date || ''}
          mainPictureUrl={mainPictureUrl || ''}
          published={published || false}
          coordinates={coordinates || ''}
          tags={tags || ''}
          updateTitle={updateTitle}
        />
      ) : (
        <TitleView
          title={title}
          date={date}
          mainPictureUrl={mainPictureUrl}
          published={published}
          onArticlePublishClick={onArticlePublishClick}
        />
      )}
    </div>
  );
}

export default HeaderEditor;
