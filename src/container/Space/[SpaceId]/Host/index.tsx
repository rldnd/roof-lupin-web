import { DataItem, DataList } from "@/components";
import { BaseHeader } from "@/components/Layout";
import { getSpaceHostApi } from "@/services/host";
import { getPhoneNumberWithHyphen } from "@/utils/regex";

import styles from "./spaceHostInfoContainer.module.scss";

interface Props {
  params: {
    spaceId: string;
  };
}

export default async function SpaceHostInfoContainer({ params }: Props) {
  const host = await getSpaceHostApi(params.spaceId);

  return (
    <div className={styles.wrapper}>
      <BaseHeader title="호스트 정보" />
      <main>
        <DataList>
          <DataItem label="대표자명">{host.name}</DataItem>
          <DataItem label="상호명">{host.account.businessName}</DataItem>
          <DataItem label="사업자 등록번호">{host.account.businessRegistrationNumber}</DataItem>
          <DataItem label="이메일 주소">{host.email}</DataItem>
          <DataItem label="연락처">{getPhoneNumberWithHyphen(host.phoneNumber)}</DataItem>
        </DataList>
      </main>
    </div>
  );
}
