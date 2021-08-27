import { Schema, model, models } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import type { Types, Model, SchemaDefinitionProperty } from 'mongoose';

import type { Creator } from './creator';
import type { Currency, ExperienceCategory } from 'graphql-server/sdk';

export interface Experience {
    _id: Types.ObjectId;
    status: 'pending' | 'approved' | 'rejected';
    zoomInfo?: { // For Zoom experiences
        PMI: string;
        password: string;
    }
    location: {
        displayLocation: string; // Used for autocomplete searchbars
        meetPoint?: string;
        coordinates?: {
            lat: number;
            long: number;
        }
    }
    title: string;
    categories: [ExperienceCategory] | [ExperienceCategory, ExperienceCategory];
    description: string;
    ageRestriction?: number;
    duration: number;
    languages: string[];
    capacity: number;
    images: string[];
    included?: string[];
    toBring?: string[];
    price: {
        perPerson: number;
        private?: number;
        currency: Currency;
    }
    rating: {
        value: number;
        numRatings: number;
    }
    creator: Types.ObjectId | Creator;
}

const experienceSchemaFields: Record<keyof Omit<Experience, '_id'>, SchemaDefinitionProperty> = {
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected']
    },

    zoomInfo: { 
        PMI: String,
        password: String
    },

    location: {
        displayLocation: { 
            type: String, 
            required: true
        }, 
        meetPoint: String, 
        coordinates: {
            lat: Number,
            long: Number
        }
    },

    title: {
        type: String,
        required: true
    },

    categories: [{
        type: String,
        enum: ['taste', 'create', 'relax', 'learn', 'move'],
        minlength: 1,
        maxlength: 2
    }],

    description: {
        type: String,
        required: true
    },

    ageRestriction: Number,

    duration: { 
        type: Number,
        required: true,
        min: 0.5
    },

    languages: [String],

    capacity: { 
        type: Number,
        required: true,
        min: 1 
    },

    images: [String],

    included: [String],

    toBring: [String],

    price: {
        perPerson: {
            type: Number,
            required: true
        },
        private: Number,
        currency: {
            type: String,
            required: true,
            enum: ['CAD', 'USD']
        }
    },

    rating: {
        value: {
            type: Number,
            min: 1, 
            max: 5,
            default: 5
        },
        numRatings: {
            type: Number,
            default: 0
        }
    },
    
    creator: {
        type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Creator'
    }
}

const experienceSchema = new Schema<Experience>(experienceSchemaFields);
experienceSchema.plugin(mongooseLeanDefaults);

export default (models.Experience as Model<Experience, {}, {}>) || model<Experience>('Experience', experienceSchema);