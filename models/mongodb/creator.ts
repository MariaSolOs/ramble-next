import { Schema, model, models } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import type { Types, Model } from 'mongoose';

import type { User } from './user';
import type { Booking } from './booking';

export interface Creator {
    _id: Types.ObjectId;
    user: Types.ObjectId | User;
    governmentIds: string[];
    bio: string;
    stripe: {
        onboarded: boolean; // True if they completed Stripe's onboarding
        accountId?: string;
    }
    bookingRequests?: (Types.ObjectId | Booking)[];
}

const creatorSchemaFields: Record<keyof Omit<Creator, '_id'>, any> = {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    governmentIds: {
        type: [String],
        required: true
    },

    bio: {
        type: String,
        required: true
    },

    stripe: {
        accountId: String,
        onboarded: Boolean
    },

    bookingRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}

const creatorSchema = new Schema<Creator>(creatorSchemaFields);
creatorSchema.plugin(mongooseLeanDefaults);

export default (models.Creator as Model<Creator, {}, {}>) || model<Creator>('Creator', creatorSchema);
  