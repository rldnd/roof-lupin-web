"use client";

import Section from "../Section";
import ToggleItem from "../ToggleItem";

const AlarmSection: React.FC = () => {
  return (
    <Section>
      <ToggleItem checked onChange={() => {}}>
        알림 설정
      </ToggleItem>
    </Section>
  );
};

export default AlarmSection;
