import { parseText } from '../../../../utils/chnksUtils';
import styles from './ParagraphView.module.scss';
import _ from 'lodash';

interface Props {
  text: string;
}

function ParagraphView({ text }: Props) {
  return (
    <div>
      <div className={styles.text}>{_.isEmpty(text) ? 'wpisz tekst' : parseText(text)}</div>
    </div>
  );
}

export default ParagraphView;
