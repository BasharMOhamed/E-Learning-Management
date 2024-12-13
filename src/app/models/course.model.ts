export interface grades {
  name: string;
  hours: string;
  status: string;
  instructor: string;
  grades: {
    theoretical: number;
    practical: number;
    yearwork: number;
    midterm: number;
    quizzes: number;
  };
}
