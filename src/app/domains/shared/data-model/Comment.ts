export interface Comment {
  id: number;
  message: string;
  authorEmail: string;
  authorName: string;
  updateDate: string;
  state: string;
  sourceSystem: string;
  isEditing?: boolean; // used for UI
}
