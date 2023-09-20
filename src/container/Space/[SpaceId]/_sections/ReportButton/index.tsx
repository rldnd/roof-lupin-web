"use client";

import { useParams, useRouter } from "next/navigation";

import { AuthChecker } from "@/components";

import styles from "./reportButton.module.scss";

const ReportButton: React.FC = () => {
  const { spaceId } = useParams();
  const { push } = useRouter();

  const onClick = () => {
    push(`/spaces/${spaceId}/reports`);
  };

  return (
    <AuthChecker>
      <button type="button" onClick={onClick} className={styles.wrapper}>
        신고하기
      </button>
    </AuthChecker>
  );
};

export default ReportButton;
