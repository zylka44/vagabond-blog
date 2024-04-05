import { useForm } from '../../../../../../app/hooks/useForm';
import Input from '../../../../../../shared/components/Input/Input';
import { useEffect } from 'react';

interface Props {
  url: string;
  description: string;
  location: string;
  onPictureEdition: (newUrl: string, newDescription: string, newLocation: string) => void;
}

function PictureEditor({ url, description, location, onPictureEdition }: Props) {
  const { values, handleChange } = useForm<{ url: string; description: string; location: string }>({
    url,
    description,
    location,
  });

  useEffect(() => {
    onPictureEdition(values.url, values.description, values.location);
  }, [values]);

  return (
    <div className="picture-editor-main-container">
      <div className="picture">
        <Input name={'url'} value={values.url} onChange={handleChange} placeholder={'url'} noBorder />
      </div>
      <div className="description">
        <Input
          name={'description'}
          value={values.description}
          onChange={handleChange}
          placeholder={'opis'}
          autoFocus={false}
          noBorder
        />
      </div>
      <div className="location">
        <Input
          name={'location'}
          value={values.location}
          onChange={handleChange}
          placeholder={'współrzędne'}
          autoFocus={false}
          noBorder
        />
      </div>
    </div>
  );
}

export default PictureEditor;
