import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getArticleByIdAction } from '../../../app/features/articles.slice';
import { useArticles } from '../../../app/hooks/useArticles';
import { Article, Chunk, ChunkType, ConfirmModalConfig, Publication } from '../../../shared/models/article.model';
import HeaderEditor from './HeaderEditor/HeaderEditor';
import styles from './Update.module.scss';
import ScrollButton from '../../../shared/components/ScrollButton/ScrollButton';
import ChunkEditor from './ChunkEditor/ChunkEditor';
import { useModals } from '../../../app/hooks/useModals';

interface Props {
  articleId: string;
}

function Update({ articleId }: Props) {
  const dispatch = useDispatch();
  const { openModal } = useModals();
  const { selectArticleById, selectArticleChunks, updateArticle } = useArticles();
  const [beingEditedId, setBeingEditedId] = useState<string>();
  const [newChunkConfig, setNewChunkConfig] = useState<{ index: number; type: ChunkType }>();
  const [beingEditedType, setBeingEditedType] = useState<ChunkType>('paragraph');
  const article = selectArticleById(articleId);
  const chunks = selectArticleChunks(articleId, newChunkConfig);

  useEffect(() => {
    if (!_.isEmpty(articleId)) {
      dispatch(getArticleByIdAction(articleId));
    }
  }, []);

  const updateHeader = (
    newTitle: string,
    newDate: string,
    newMainPictureUrl: string,
    newCoordinates: string,
    newTags: string,
    newPublicationState: boolean
  ) => {
    const publication: Publication = {
      ...article.publication,
      published: newPublicationState,
      coordinates: newCoordinates,
      tags: newTags,
    };
    const updatedArticle: Article = {
      ...article,
      title: newTitle,
      date: newDate,
      mainPictureUrl: newMainPictureUrl,
      publication,
    };
    updateArticle(updatedArticle);
  };

  const openChunkEditor = (chunkId: string, chunkType: ChunkType) => {
    setBeingEditedType(chunkType);
    setBeingEditedId(chunkId);
  };

  const createNewChunk = (previousId: string) => {
    const index = chunks.findIndex((ch) => ch.id === previousId) + 1;
    setNewChunkConfig({ index, type: beingEditedType });
    setBeingEditedId('newChunk');
  };

  const createFirstChunk = () => {
    createNewChunk('0');
  };

  const updateChunk = (updatedChunk: Chunk) => {
    const updatedChunkId = updatedChunk.id;
    const updatedChunks = chunks.map((chunk) => {
      if (chunk.id === updatedChunkId) {
        return updatedChunk;
      } else {
        return chunk;
      }
    });
    const updatedArticle: Article = { ...article, chunks: updatedChunks };
    setBeingEditedId(undefined);
    setBeingEditedType('paragraph');
    setNewChunkConfig(undefined);
    updateArticle(updatedArticle);
  };

  const onDeleteChunkClick = (id: string) => {
    const config: ConfirmModalConfig = {
      text: 'Czy na pewno chcesz usunąć ten fragment?',
      onConfirm: () => deleteChunk(id),
    };
    openModal('confirm', config);
  };

  const deleteChunk = (id: string) => {
    const updatedChunks = chunks.filter((chunk) => chunk.id !== id);
    const updatedArticle: Article = { ...article, chunks: updatedChunks };
    updateArticle(updatedArticle);
  };

  const moveChunk = (id: string, direction: 'up' | 'down') => {
    const _chunks = _.cloneDeep(chunks);
    const movedChunk = _chunks.find((chunk) => chunk.id === id);
    const movedChunkId = _chunks.findIndex((chunk) => chunk.id === id);

    if (_.isNil(movedChunk)) return;

    if (direction === 'up') {
      const prevChunkId = movedChunkId - 1;
      if (prevChunkId < 0) return;
      const prevChunk = chunks[prevChunkId];
      _chunks[prevChunkId] = movedChunk;
      _chunks[movedChunkId] = prevChunk;
    } else {
      const nextChunkId = movedChunkId + 1;
      if (nextChunkId > _chunks.length - 1) return;
      const nextChunk = chunks[nextChunkId];
      _chunks[nextChunkId] = movedChunk;
      _chunks[movedChunkId] = nextChunk;
    }
    const updatedArticle: Article = { ...article, chunks: _chunks };
    updateArticle(updatedArticle);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainPicture} style={{ backgroundImage: `url(${article.mainPictureUrl})` }}></div>
      <div className={styles.article}>
        <div className={styles.header}>
          <HeaderEditor
            title={article.title}
            date={article.date}
            mainPictureUrl={article.mainPictureUrl}
            published={article.publication?.published}
            coordinates={article.publication?.coordinates}
            tags={article.publication?.tags}
            updateHeader={updateHeader}
          />
        </div>
        <div className={styles.chunks}>
          {!_.isNil(article?.chunks?.length) && (
            <div className={styles.addChunk} onClick={createFirstChunk}>
              +
            </div>
          )}
          {chunks?.map((chunk) => (
            <>
              <ChunkEditor
                key={chunk.id}
                onClick={() => openChunkEditor(chunk.id, chunk.type)}
                chunk={chunk}
                updateChunk={updateChunk}
                onChunkDelete={onDeleteChunkClick}
                moveChunk={moveChunk}
                isBeingEdited={beingEditedId === chunk.id}
              />
              <div className={styles.addChunk} onClick={() => createNewChunk(chunk.id)}>
                +
              </div>
            </>
          ))}
        </div>
      </div>
      <ScrollButton />
    </div>
  );
}

export default Update;
