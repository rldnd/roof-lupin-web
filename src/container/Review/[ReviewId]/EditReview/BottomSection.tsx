"use client";

import { ChangeEventHandler } from "react";

import { useAtom } from "jotai";

import { Button, HorizonDraggable, Textarea } from "@/components";
import { updateReviewBodyState } from "@/states";

import { IconCloseWithOverlay, IconOrangeCamera } from "public/icons";

import styles from "./bottomSection.module.scss";

const BottomSection: React.FC = () => {
  const [body, setBody] = useAtom(updateReviewBodyState);

  const onChangeTextarea: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.currentTarget;
    setBody((prev) => ({ ...prev, content: value }));
  };

  const onChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.currentTarget;
    if (!files || Array.from(files).length === 0) return;
    const tempImages = Array.from(files).map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setBody((prev) => ({ ...prev, tempImages: [...prev.tempImages, ...tempImages] }));
  };

  const onClickDeleteImage = (preview: string) => {
    setBody((prev) => ({ ...prev, tempImages: prev.tempImages.filter((image) => image.preview !== preview) }));
  };

  return (
    <section className={styles.wrapper}>
      <Textarea
        value={body.content}
        className={styles.textarea}
        onChange={onChangeTextarea}
        placeholder={` •  솔직한 리뷰를 남겨주세요!\n •  사진은 세 장까지 첨부할 수 있어요.`}
      />
      {body.tempImages.length > 0 && (
        <HorizonDraggable className={styles.images}>
          {body.tempImages.map((image) => (
            <div className={styles.imageWrapper} key={image.preview}>
              <button type="button" className={styles.deleteImage} onClick={() => onClickDeleteImage(image.preview)}>
                <IconCloseWithOverlay />
              </button>
              <img width={128} height={128} src={image.preview} alt="공간 이미지" className={styles.image} />
            </div>
          ))}
        </HorizonDraggable>
      )}
      <Button type="button" color="secondary" className={styles.addImageWrapper}>
        <label htmlFor="writeReviewImage" className={styles.addImage}>
          <IconOrangeCamera />
          사진 첨부하기
        </label>
      </Button>
      <input type="file" id="writeReviewImage" hidden accept="image/*" multiple onChange={onChangeFile} />
    </section>
  );
};

export default BottomSection;
