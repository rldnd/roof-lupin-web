"use client";

import { useState } from "react";

import Section from "../Section";
import ToggleItem from "../ToggleItem";

const AlarmSection: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const onChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Section>
      <ToggleItem checked={checked} onChange={onChange}>
        알림 설정
      </ToggleItem>
    </Section>
  );
};

export default AlarmSection;
