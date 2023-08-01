import { PLATFORM } from "@/common/constants";
import { sessionPersistenceAtom } from "@/utils/jotai";

export type Platform = "ios" | "android" | null;

export const platformState = sessionPersistenceAtom<Platform>(PLATFORM, null);
