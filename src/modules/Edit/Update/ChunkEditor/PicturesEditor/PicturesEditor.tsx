import { Picture } from '../../../../../shared/models/article.model';
import PictureEditor from './PictureEditor/PictureEditor';

interface Props {
  pictures: Picture[];
  onPictureEdition: (id: string, newUrl: string, newDescription: string, newLocation: string) => void;
}

function PicturesEditor({ pictures, onPictureEdition }: Props) {
  return (
    <div className="pictures-editor-main-container">
      <div className="pictures">
        {pictures.map((picture) => (
          <PictureEditor
            key={picture.id}
            url={picture.url}
            description={picture.description || ''}
            location={picture.location || ''}
            onPictureEdition={(newUrl: string, newDescription: string, newLocation: string) =>
              onPictureEdition(picture.id, newUrl, newDescription, newLocation)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default PicturesEditor;
