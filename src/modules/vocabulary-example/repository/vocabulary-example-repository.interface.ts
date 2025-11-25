import { BaseRepository } from "@module/repository/common/base-repository.interface";
import { VocabularyExample } from "../entities/vocabulary-example.entity";

export interface VocabularyExampleRepository
    extends BaseRepository<VocabularyExample> {}
