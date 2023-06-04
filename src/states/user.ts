import { atom } from "jotai";

import type { CommonUser } from "@/common/types/user";

// TODO: persistenceAtom
export const meState = atom<CommonUser | null>(null);
