"use client";

import Section from "../Section";
import ToggleItem from "../ToggleItem";

import styles from "./eventSection.module.scss";

const EventSection: React.FC = () => {
  return (
    <Section title="혜택 및 이벤트 알림">
      <ToggleItem checked onChange={() => {}} className={styles.item}>
        이메일 알림
      </ToggleItem>
      <ToggleItem checked onChange={() => {}} className={styles.item}>
        SMS 알림
      </ToggleItem>
      <ToggleItem checked onChange={() => {}} className={styles.item}>
        앱 Push 알림
      </ToggleItem>
    </Section>
  );
};

export default EventSection;
