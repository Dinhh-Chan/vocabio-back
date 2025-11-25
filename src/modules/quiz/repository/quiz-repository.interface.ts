import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { Quiz } from "../entities/quiz.entity";

export interface QuizRepository extends BaseRepository<Quiz> {}
