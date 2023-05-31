import { atom } from "jotai";

import type { CommonUser } from "@/common/types/user";

export const meState = atom<CommonUser | null>(null);
