import { useEffect } from 'react';
import { useForm } from '../../../../../app/hooks/useForm';
import Input from '../../../../../shared/components/Input/Input';

interface Props {
  text: string;
  onSubtitleEdition: (newText: string) => void;
}

function SubtitleEditor({ text = '', onSubtitleEdition }: Props) {
  const { values, handleChange } = useForm<{ text: string }>({ text });

  useEffect(() => {
    onSubtitleEdition(values.text);
  }, [values]);

  return (
    <div className="subtitle-editor-main-container">
      <Input name={'text'} value={values.text} onChange={handleChange} placeholder={'podtytuł'} noBorder uppercase />
    </div>
  );
}

export default SubtitleEditor;
