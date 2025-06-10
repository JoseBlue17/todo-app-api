import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  completed: boolean;

  @Prop()
  category: string;

  @Prop()
  dueDate?: Date;

  @Prop({
    ref: 'User',
    required: true,
    set: (val: string) => new Types.ObjectId(val),
  })
  userId: Types.ObjectId;
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
