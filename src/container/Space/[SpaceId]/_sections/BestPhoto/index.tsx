"use client";

import Image from "next/image";

import { BestPhoto as BestPhotoType } from "@/common/types/space";
import { HorizonDraggable } from "@/components";

import ProgressBar from "./ProgressBar";
import TotalButton from "./TotalButton";

import styles from "./bestPhoto.module.scss";

interface Props {
  bestPhotos: BestPhotoType[];
}

const BestPhoto: React.FC<Props> = ({ bestPhotos }) => {
  return (
    <section id="best-photo-section" className={styles.wrapper}>
      <div className={styles.top}>
        <small className={styles.small}>루프루팡 PICK!</small>
        <h2 className={styles.title}>
          베스트 포토<span>{bestPhotos.length}</span>
        </h2>
      </div>
      <HorizonDraggable className={styles.imageList}>
        {bestPhotos.map((image) => (
          <li key={image.url} className={styles.imageWrapper}>
            <Image src={image.url} alt="베스트 포토 이미지" width={200} height={275} />
          </li>
        ))}
      </HorizonDraggable>
      <ProgressBar />
      <TotalButton />
    </section>
  );
};

export default BestPhoto;
