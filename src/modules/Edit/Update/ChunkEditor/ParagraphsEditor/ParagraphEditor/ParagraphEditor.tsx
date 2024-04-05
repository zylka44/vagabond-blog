import { useEffect } from 'react';
import { useForm } from '../../../../../../app/hooks/useForm';
import TextArea from '../../../../../../shared/components/TextArea/TextArea';

interface Props {
  text: string;
  onParagrphEdition: (newText: string) => void;
}

function ParagraphEditor({ text = '', onParagrphEdition }: Props) {
  const { values, handleChange } = useForm<{ text: string }>({ text });

  useEffect(() => {
    onParagrphEdition(values.text);
  }, [values]);

  return (
    <div className="paragraph-editor-main-container">
      <TextArea name={'text'} value={values.text} onChange={handleChange} placeholder={'wpisz tekst'} noBorder />
    </div>
  );
}

export default ParagraphEditor;
