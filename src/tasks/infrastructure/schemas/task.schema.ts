// task.schema.ts - VERSIÓN OPTIMIZADA
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { ALLOWED_COLORS } from 'src/shared/utils/common-colors';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: null })
  description?: string | null;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ default: ALLOWED_COLORS[0] })
  category: string;

  @Prop({ default: null })
  dueDate?: Date | null;

  @Prop({
    required: true,
    set: (val: string) => new Types.ObjectId(val),
  })
  userId: Types.ObjectId;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
