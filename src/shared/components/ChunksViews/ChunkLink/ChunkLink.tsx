import styles from './ChunkLink.module.scss';

interface Props {
  text: string;
  url: string;
}

function ChunkLink({ text, url }: Props) {
  return (
    <a className={styles.chunkLink} href={url} target="_blank">
      {text}
    </a>
  );
}

export default ChunkLink;
