"use client";

import Section from "../Section";
import ToggleItem from "../ToggleItem";

const LocationSection: React.FC = () => {
  return (
    <Section>
      <ToggleItem checked onChange={() => {}}>
        위치 정보 접근 권한
      </ToggleItem>
    </Section>
  );
};

export default LocationSection;
