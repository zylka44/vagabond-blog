import styles from './SubtitleView.module.scss';

interface Props {
  text: string;
}

function SubtitleView({ text }: Props) {
  return (
    <div>
      <div className={styles.text}>{text.toUpperCase()}</div>
    </div>
  );
}

export default SubtitleView;
