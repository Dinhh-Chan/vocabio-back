import { PartialType } from "@nestjs/mapped-types";
import { CreateSrsProgressDto } from "./create-srs-progress.dto";

export class UpdateSrsProgressDto extends PartialType(CreateSrsProgressDto) {}
