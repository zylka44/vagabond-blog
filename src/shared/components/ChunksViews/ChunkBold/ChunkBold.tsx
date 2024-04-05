import styles from './ChunkBold.module.scss';

interface Props {
  text: string;
}

function ChunkBold({ text }: Props) {
  return <b className={styles.chunkBold}>{text}</b>;
}

export default ChunkBold;
