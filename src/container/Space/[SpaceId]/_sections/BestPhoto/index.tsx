"use client";

import { BestPhoto as BestPhotoType } from "@/common/types/space";
import { HorizonDraggable } from "@/components";

import ProgressBar from "./ProgressBar";
import TotalButton from "./TotalButton";

import styles from "./bestPhoto.module.scss";

interface Props {
  bestPhotos: BestPhotoType[];
}

const BestPhoto: React.FC<Props> = ({ bestPhotos }) => {
  const isEmpty = bestPhotos.length === 0;

  return (
    <section id="best-photo-section" className={styles.wrapper}>
      <div className={styles.top}>
        <small className={styles.small}>루프루팡 PICK!</small>
        <h2 className={styles.title}>
          베스트 포토<span>{bestPhotos.length}</span>
        </h2>
      </div>
      <HorizonDraggable className={styles.imageList}>
        {isEmpty && <li className={styles.emptyImage} />}
        {!isEmpty &&
          bestPhotos.map((image) => (
            <li key={image.url} className={styles.imageWrapper}>
              <img src={image.url} alt="베스트 포토 이미지" width={200} height={275} />
            </li>
          ))}
      </HorizonDraggable>
      {!isEmpty && <ProgressBar />}
      <TotalButton />
    </section>
  );
};

export default BestPhoto;
