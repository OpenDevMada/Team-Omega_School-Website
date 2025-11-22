export interface Announcement {
  readonly id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AnnouncementPostData = Required<
  Pick<Announcement, "title" | "description">
>;
