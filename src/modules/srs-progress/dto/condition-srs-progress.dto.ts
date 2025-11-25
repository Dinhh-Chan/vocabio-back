import { PartialType } from "@nestjs/mapped-types";
import { SrsProgress } from "../entities/srs-progress.entity";

export class ConditionSrsProgressDto extends PartialType(SrsProgress) {}
