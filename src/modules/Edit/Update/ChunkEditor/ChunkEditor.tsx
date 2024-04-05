import { useState } from 'react';
import styles from './ChunkEditor.module.scss';
import _ from 'lodash';
import PicturesView from '../../../../shared/components/ChunksViews/PicturesView/PicturesView';
import SubtitleView from '../../../../shared/components/ChunksViews/SubtitleView/SubtitleView';
import { Chunk, ChunkType, Picture } from '../../../../shared/models/article.model';
import PicturesEditor from './PicturesEditor/PicturesEditor';
import SubtitleEditor from './SubtitleEditor/SubtitleEditor';
import ParagraphsEditor from './ParagraphsEditor/ParagraphsEditor';
import ParagraphsView from '../../../../shared/components/ChunksViews/ParagraphsView/ParagraphsView';
import Action from '../../../../shared/components/Action/Action';
import classNames from 'classnames';
import { sampleUrl } from '../../../../shared/consts/GeneralConsts';

const chunksTypesNames: { type: ChunkType; name: string }[] = [
  { type: 'subtitle', name: 'podtytuł' },
  { type: 'paragraph', name: 'akapit' },
  { type: 'paragraph-picture', name: 'akapit i zdjęcie' },
  { type: 'picture-paragraph', name: 'zdjęcie i akapit' },
  { type: 'picture', name: 'zdjęcie' },
  { type: 'picture-double', name: 'dwa zdjęcia' },
];

const emptyPictures = [
  { id: 'newPicture0', url: sampleUrl },
  { id: 'newPicture1', url: sampleUrl },
];

interface Props {
  chunk: Chunk;
  onClick: () => void;
  updateChunk: (newChunk: Chunk) => void;
  onChunkDelete?: (id: string) => void;
  moveChunk?: (id: string, direction: 'up' | 'down') => void;
  isBeingEdited: boolean;
}

function ChunkEditor({
  chunk: { id, type, text = '', pictures = [], info = '' },
  onClick,
  updateChunk,
  onChunkDelete,
  moveChunk,
  isBeingEdited,
}: Props) {
  const [newType, setNewType] = useState<ChunkType>(type);
  const [newText, setNewText] = useState<string>(text || '');
  const [newPictures, setNewPictures] = useState<Picture[]>(!_.isEmpty(pictures) ? pictures : emptyPictures);

  const onChunkDeleteClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    !_.isNil(onChunkDelete) && onChunkDelete(id);
  };

  const onChunkUp = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    !_.isNil(moveChunk) && moveChunk(id, 'up');
  };

  const onChunkDown = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    !_.isNil(moveChunk) && moveChunk(id, 'down');
  };

  const changeType = (chunkType: ChunkType) => setNewType(chunkType);

  const onTextEdition = (newText: string) => {
    setNewText(newText);
  };

  const onPictureEdition = (id: string, newUrl: string, newDescription: string, newLocation: string) => {
    const pics = _.cloneDeep(newPictures);
    const pictureToUpdateIndex = pics.findIndex((pic) => pic.id === id);
    if (!_.isNil(pics[pictureToUpdateIndex])) {
      pics[pictureToUpdateIndex].url = newUrl;
      pics[pictureToUpdateIndex].description = newDescription;
      pics[pictureToUpdateIndex].location = newLocation;
    } else {
      pics.push({ id, url: newUrl, description: newDescription, location: newLocation });
    }
    setNewPictures(pics);
  };

  const save = () => {
    const updatedChunk: Chunk = {
      id,
      type: newType,
      text: newText,
      pictures: newPictures,
      info,
    };
    updateChunk(updatedChunk);
  };

  const onEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isBeingEdited) {
      save();
    }
  };

  return (
    <div
      className={classNames(styles.container, { [styles.isBeingEdited]: isBeingEdited })}
      onClick={onClick}
      onKeyDown={onEnterPress}
    >
      {isBeingEdited ? (
        <>
          {newType === 'subtitle' && <SubtitleEditor text={newText} onSubtitleEdition={onTextEdition} />}
          {(newType === 'paragraph' || newType === 'paragraph-picture' || newType === 'picture-paragraph') && (
            <ParagraphsEditor
              type={newType}
              text={newText}
              pictures={newPictures}
              onParagrphEdition={onTextEdition}
              onPictureEdition={onPictureEdition}
            />
          )}
          {newType === 'picture' && <PicturesEditor pictures={[newPictures[0]]} onPictureEdition={onPictureEdition} />}
          {newType === 'picture-double' && (
            <PicturesEditor pictures={newPictures} onPictureEdition={onPictureEdition} />
          )}
        </>
      ) : (
        <>
          {type === 'subtitle' && <SubtitleView text={text} />}
          {(type === 'paragraph' || type === 'paragraph-picture' || type === 'picture-paragraph') && (
            <ParagraphsView type={type} text={text} pictures={pictures} />
          )}
          {(type === 'picture' || type === 'picture-double') && <PicturesView type={type} pictures={pictures} />}
        </>
      )}
      {isBeingEdited && (
        <div className={styles.typeSelector}>
          {chunksTypesNames.map((chunkTypeName) => (
            <span
              key={chunkTypeName.name}
              className={classNames(styles.chunkType, { [styles.typeSelected]: newType === chunkTypeName.type })}
              onClick={() => changeType(chunkTypeName.type)}
            >
              {chunkTypeName.name}
            </span>
          ))}
        </div>
      )}
      {!isBeingEdited && !_.isNil(onChunkDelete) && (
        <div className={styles.delete}>
          <Action type="delete" onClick={onChunkDeleteClick} size="s" />
        </div>
      )}
      {!isBeingEdited && !_.isNil(moveChunk) && (
        <div className={styles.move}>
          <Action type="up" onClick={onChunkUp} size="s" />
          <Action type="down" onClick={onChunkDown} size="s" />
        </div>
      )}
      {isBeingEdited && (
        <div className={styles.save}>
          <Action type="ok" onClick={save} size="s" />
        </div>
      )}
    </div>
  );
}

export default ChunkEditor;
