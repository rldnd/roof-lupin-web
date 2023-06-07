import { USER_INFO } from "@/common/constants";
import type { CommonUser } from "@/common/types/user";
import { persistenceAtom } from "@/utils/jotai";

export const meState = persistenceAtom<CommonUser | null>(USER_INFO, null);
