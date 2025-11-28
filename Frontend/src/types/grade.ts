export interface Grade {
  id: string;
  studentRegistration: string;
  courseTitle: string;
  value: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export type GradeRequestDto = Omit<Grade, "id" | "createdAt" | "updatedAt">;

export type GradeResponseDto = Grade;
