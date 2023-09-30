import { APP_VERSION } from "@/common/constants";
import { sessionPersistenceAtom } from "@/utils/jotai";

export const appVersionState = sessionPersistenceAtom<string>(APP_VERSION, "");
