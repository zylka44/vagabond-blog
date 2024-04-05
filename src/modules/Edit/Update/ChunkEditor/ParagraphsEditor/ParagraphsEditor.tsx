import { ParagraphType, Picture } from '../../../../../shared/models/article.model';
import PictureEditor from '../PicturesEditor/PictureEditor/PictureEditor';
import ParagraphEditor from './ParagraphEditor/ParagraphEditor';

const emptyPicture: Picture = { id: '0', url: '', description: '' };

interface Props {
  type: ParagraphType;
  text: string;
  pictures: Picture[];
  onParagrphEdition: (newText: string) => void;
  onPictureEdition: (id: string, newUrl: string, newDescription: string, newLocation: string) => void;
}

function ParagraphsEditor({ type, text, pictures, onParagrphEdition, onPictureEdition }: Props) {
  return (
    <div className="pictures-editor-main-container">
      <div className="pictures">
        {type === 'paragraph' && <ParagraphEditor text={text} onParagrphEdition={onParagrphEdition} />}
        {type === 'paragraph-picture' && (
          <>
            <ParagraphEditor text={text} onParagrphEdition={onParagrphEdition} />
            <PictureEditor
              url={pictures[0]?.url || ''}
              description={pictures[0]?.description || ''}
              location={pictures[0]?.location || ''}
              onPictureEdition={(newUrl: string, newDescription: string, newLocation: string) =>
                onPictureEdition(pictures[0]?.id ?? '0', newUrl, newDescription, newLocation)
              }
            />
          </>
        )}
        {type === 'picture-paragraph' && (
          <>
            <PictureEditor
              url={pictures[0]?.url || ''}
              description={pictures[0]?.description || ''}
              location={pictures[0]?.location || ''}
              onPictureEdition={(newUrl: string, newDescription: string, newLocation: string) =>
                onPictureEdition(pictures[0]?.id ?? '0', newUrl, newDescription, newLocation)
              }
            />
            <ParagraphEditor text={text} onParagrphEdition={onParagrphEdition} />
          </>
        )}
      </div>
    </div>
  );
}

export default ParagraphsEditor;
