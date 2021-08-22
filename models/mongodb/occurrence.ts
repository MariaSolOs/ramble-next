import { Schema, model, models } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import type { Types, Model, SchemaDefinitionProperty } from 'mongoose';

import type { Experience } from './experience';
import type { Booking } from './booking';

export interface Occurrence {
    _id: Types.ObjectId;
    experience: Types.ObjectId | Experience;
    dateStart: Date;
    dateEnd: Date;
    spotsLeft: number;
    creatorProfit: number; // Only takes into account confirmed bookings
    bookings: (Types.ObjectId | Booking)[];
}

const occurrenceSchemaFields: Record<keyof Omit<Occurrence, '_id'>, SchemaDefinitionProperty> = {
    experience: {
        type: Schema.Types.ObjectId,
        ref: 'Experience',
        required: true
    },

    dateStart: {
        type: Date,
        required: true
    },

    dateEnd: {
        type: Date,
        required: true
    },

    spotsLeft: {
        type: Number,
        required: true,
        min: 0
    },

    creatorProfit: { 
        type: Number,
        required: true,
        min: 0
    },
    
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}

const occurrenceSchema = new Schema<Occurrence>(occurrenceSchemaFields);
occurrenceSchema.plugin(mongooseLeanDefaults);
  
export default (models.Occurrence as Model<Occurrence, {}, {}>) || model<Occurrence>('Occurrence', occurrenceSchema);