"use client";

import { ChangeEventHandler } from "react";

import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { Button, HorizonDraggable, Textarea } from "@/components";
import { useToast } from "@/hooks";
import { uploadImagesApi } from "@/services/file";
import { createReviewBodyState } from "@/states";

import { IconCloseWithOverlay, IconOrangeCamera } from "public/icons";

import styles from "./bottomSection.module.scss";

const BottomSection: React.FC = () => {
  const [body, setBody] = useAtom(createReviewBodyState);

  const { addToast } = useToast();
  const { mutate } = useMutation(uploadImagesApi, {
    onSuccess: ({ data }) => {
      setBody((prev) => ({ ...prev, images: [...prev.images, ...data.map((item) => item.url)] }));
    },
    onError: () => addToast({ message: "지원하지 않는 확장자 파일이 포함되어 있습니다!" }),
  });

  const onChangeTextarea: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { value } = e.currentTarget;
    setBody((prev) => ({ ...prev, content: value }));
  };

  const onChangeFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.currentTarget;
    if (!files || Array.from(files).length === 0) return;

    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("images", file);
    }
    mutate(formData);
  };

  const onClickDeleteImage = (image: string) => {
    setBody((prev) => ({ ...prev, images: prev.images.filter((item) => item !== image) }));
  };

  return (
    <section className={styles.wrapper}>
      <Textarea
        value={body.content}
        className={styles.textarea}
        onChange={onChangeTextarea}
        placeholder={` •  솔직한 리뷰를 남겨주세요!\n •  사진은 몇 장까지 첨부할 수 있어요.`}
      />
      {body.images.length > 0 && (
        <HorizonDraggable className={styles.images}>
          {body.images.map((image) => (
            <div className={styles.imageWrapper} key={image}>
              <button type="button" className={styles.deleteImage} onClick={() => onClickDeleteImage(image)}>
                <IconCloseWithOverlay />
              </button>
              <img width={128} height={128} src={image} alt="공간 이미지" className={styles.image} />
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
