import { Schema, model, models } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import type { Types, Model, SchemaDefinitionProperty } from 'mongoose';

export interface Review {
    _id: Types.ObjectId;
    experience: Types.ObjectId;
    reviewer: Types.ObjectId;
    reviewerName: string;
    text: string;
    value: number;
    approved: boolean; // If true, review is made public
    createdAt: Date;
    updatedAt: Date;
}

const reviewSchemaFields: Record<keyof Omit<Review | 'createdAt' | 'updatedAt', '_id'>, SchemaDefinitionProperty> = {
    experience: {
        type: Schema.Types.ObjectId,
        ref: 'Experience',
        required: true
    },

    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    reviewerName: {
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

const reviewSchema = new Schema<Review>(reviewSchemaFields, {
    timestamps: true
});
reviewSchema.plugin(mongooseLeanDefaults);

export default (models.Review as Model<Review, {}, {}>) || model<Review>('Review', reviewSchema);
