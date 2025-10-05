import { message } from "@/prisma/generated";
import { UserPublicData } from "./UserPublicData";

export type currentActiveChats = {
  chatID: number;
  contact: UserPublicData;
  lastMessage: message | null;
};
