import dynamic from "next/dynamic";

const MyPage = dynamic(() => import("./View"), { ssr: false });

export default MyPage;
