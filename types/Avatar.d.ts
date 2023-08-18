import { CommonTag } from "./index";
import { UnityUpload } from "./Unity";

/** avtr_id @see {@link VRC_ID} */
export type AvatarID = string;

export interface Avatar extends UnityUpload {
  id: AvatarID;
  tags: AvatarTag[];
}

export type AvatarTag = 
  "author_quest_fallback" |
  CommonTag ;
