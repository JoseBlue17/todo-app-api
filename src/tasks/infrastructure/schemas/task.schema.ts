import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { ALLOWED_COLORS } from 'src/shared/utils/common-colors';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ default: ALLOWED_COLORS[0] })
  category: string;

  @Prop()
  dueDate?: Date;

  @Prop({
    required: true,
    set: (val: string) => new Types.ObjectId(val),
  })
  userId: Types.ObjectId;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
