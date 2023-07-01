import { BaseHeader } from "@/components/Layout";

import PositionButton from "./PositionButton";

const Header: React.FC = () => {
  return <BaseHeader title="내 주변 옥상" backHidden right={<PositionButton />} />;
};

export default Header;
