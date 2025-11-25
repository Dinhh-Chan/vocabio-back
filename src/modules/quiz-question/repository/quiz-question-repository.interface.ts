import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { QuizQuestion } from "../entities/quiz-question.entity";

export interface QuizQuestionRepository extends BaseRepository<QuizQuestion> {}
