"use client";

import { useMe } from "@/hooks/queries";

const HomeContainer: React.FC = () => {
  const { me } = useMe();

  return (
    <div>
      <span>{JSON.stringify(me)}</span>
    </div>
  );
};

export default HomeContainer;
