"use client";

import { ChangeEventHandler } from "react";

import cx from "clsx";
import { useAtom } from "jotai";

import { Checkbox } from "@/components";
import { reservationCheckedState } from "@/states/reservation";

import styles from "./checkboxes.module.scss";

const Checkboxes: React.FC = () => {
  const [checked, setChecked] = useAtom(reservationCheckedState);
  const isCheckedAll = Object.values(checked).every((value) => value);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, checked } = e.currentTarget;
    setChecked((prev) => ({ ...prev, [name]: checked }));
  };

  const onChangeAll: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.currentTarget;
    setChecked((prev) => ({ ...prev, privacy: checked, thirdParty: checked, rule: checked }));
  };

  return (
    <section className={styles.wrapper}>
      <Checkbox isGray className={cx(styles.checkbox, styles.total)} checked={isCheckedAll} onChange={onChangeAll}>
        전체 동의
      </Checkbox>
      <Checkbox isGray className={styles.checkbox} name="privacy" checked={checked.privacy} onChange={onChange}>
        개인정보 수집 동의
      </Checkbox>
      <Checkbox isGray className={styles.checkbox} name="thirdParty" checked={checked.thirdParty} onChange={onChange}>
        개인정보 제 3자 제공 동의
      </Checkbox>
      <Checkbox isGray className={styles.checkbox} name="rule" checked={checked.rule} onChange={onChange}>
        이용규칙 및 취소, 환불 규정 동의
      </Checkbox>
    </section>
  );
};

export default Checkboxes;
