import { Schema, model, models } from 'mongoose';
import type { Types, Model, SchemaDefinitionProperty } from 'mongoose';

export interface Review {
    _id: Types.ObjectId;
    experience: Types.ObjectId;
    writtenBy: string;
    text: string;
    value: string;
    approved: boolean; // If true, review is made public
}

const reviewSchemaFields: Record<keyof Omit<Review, '_id'>, SchemaDefinitionProperty> = {
    experience: {
        type: Schema.Types.ObjectId,
        ref: 'Experience',
        required: true
    },

    writtenBy: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    value: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    approved: {
        type: Boolean,
        required: true
    }
}

const reviewSchema = new Schema<Review>(reviewSchemaFields);

export default (models.Review as Model<Review, {}, {}>) || model<Review>('Review', reviewSchema);
