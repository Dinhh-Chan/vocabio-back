import { EventAccount } from "@module/event-account/entities/event-account.entity";
import { Event } from "@module/event/entities/event.entity";
import { EventLog } from "@module/event-log/entities/event-log.entity";
import { HamSinhMaModel } from "@module/quy-tac-ma/models/ham-sinh-ma.model";
import { QuyTacMaModel } from "@module/quy-tac-ma/models/quy-tac-ma.model";
import { Model, ModelCtor } from "sequelize-typescript";
import { AuditLogModel } from "../model/audit-log.model";
import { AuthModel } from "../model/auth.model";
import { DataPartitionUserModel } from "../model/data-partition-user.model";
import { DataPartitionModel } from "../model/data-partition.model";
import { FileModel } from "../model/file.model";
import { IncrementModel } from "../model/increment.model";
import { NotificationModel } from "../model/notification.model";
import { OneSignalUserModel } from "../model/one-signal-user.model";
import { SettingModel } from "../model/setting.model";
import TopicModel from "../model/topic.model";
import { UserTopicModel } from "../model/user-topic.model";
import { UserModel } from "../model/user.model";
import { VocabularyExampleModel } from "../model/vocabulary-example.model";
import { VocabularyModel } from "../model/vocabulary.model";
import { StudySetModel } from "../model/study-set.model";
import { StudySetVocabMapModel } from "../model/study-set-vocab-map.model";
import { FolderModel } from "../model/folder.model";
import { FolderItemModel } from "../model/folder-item.model";
import { SrsProgressModel } from "../model/srs-progress.model";
import { QuizModel } from "../model/quiz.model";
import { QuizQuestionModel } from "../model/quiz-question.model";
import { QuizAnswerModel } from "../model/quiz-answer.model";
import { QuizResultModel } from "../model/quiz-result.model";

export const SequelizeModel: ModelCtor<Model>[] = [
    UserModel,
    AuthModel,
    Event,
    EventAccount,
    EventLog,
    FileModel,
    NotificationModel,
    OneSignalUserModel,
    TopicModel,
    UserTopicModel,
    SettingModel,
    IncrementModel,
    QuyTacMaModel,
    HamSinhMaModel,
    AuditLogModel,
    DataPartitionModel,
    DataPartitionUserModel,
    VocabularyModel,
    VocabularyExampleModel,
    StudySetModel,
    StudySetVocabMapModel,
    FolderModel,
    FolderItemModel,
    SrsProgressModel,
    QuizModel,
    QuizQuestionModel,
    QuizAnswerModel,
    QuizResultModel,
];
