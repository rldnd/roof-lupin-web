/** 본인인증 통신사 SKT:SKT / KT:KTF / LGU+:LGT / 알뜰폰:MVNO */
export type Carrier = "SKT" | "KTF" | "LGT" | "MVNO";

export interface CertificationParam {
  /** 주문번호
   *
   * 가맹점에서 생성/관리하는 고유 주문번호
   */
  merchant_uid: string;
  /** 허용최소 나이
   *
   * 본인인증을 진행할 수 있는 최소나이(다날 PG사 본인인증만 지원)
   */
  min_age?: number;
  /** 고객 이름
   *
   * 본인인증 화면 내 이름 필드에 자동입력됨
   */
  name?: string;
  /** 고객 전화번호
   *
   * 본인인증 화면 내 전화번호 필드에 자동입력됨
   */
  phone?: string;
  /** 본인인증 통신사
   *
   * 본인인증 화면에서 선택 가능한 통신사 설정
   */
  carrier?: string;
  /** 서비스 도메인 URL 또는 명칭
   *
   * 서비스의 대표 도메인 URL(예 : https://portone.io) 또는 서비스 명칭(예 : 포트원)으로 설정
   * 본인인증 동작에 영향을 주지는 않지만, KISA의 ePrivacy Clean 서비스 연동을 위해 설정 권장
   * React Native / Ionic 등 앱 내 local html을 통해 본 함수가 호출되는 경우, URL 도메인을 인식할 수 없으므로 설정 권장(미 설정 시: 포트원)
   */
  company?: string;
  /** 리디렉션 URL
   *
   * 모바일 환경에서 본인인증 후 리디렉션될 URL
   * 리디렉션될 때 query string 으로 imp_uid, merchant_uid, success 가 전달됩니다.
   */
  m_redirect_url?: string;
  /** 팝업 사용여부
   *
   * PC: popup : true 옵션이 강제 적용됨
   * 모바일: popup : false 사용시, m_redirect_url 필수 입력
   */
  popup?: boolean;
  pg?: string;
}

export interface CertificationCallbackArgs {
  error_code: string | null;
  error_msg: string | null;
  imp_uid: string;
  merchant_uid: Date;
  pg_provider?: string;
  pg_type?: string;
  success: boolean;
}

export interface Iamport {
  init(uid: string): void;
  certification(param: CertificationParam, callback: (args: CertificationCallbackArgs) => unknown): Promise<void>;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}
