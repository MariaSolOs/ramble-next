import { Schema, model, models } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import bcrypt from 'bcryptjs';
import type { Types, Model, SchemaDefinitionProperty } from 'mongoose';

import type { Experience } from './experience';
import type { Creator } from './creator';

export interface User {
    _id: Types.ObjectId;
    fstName: string;
    lstName: string;
    birthday?: Date;
    emailAddress: string;
    phoneNumber?: string;
    passwordHash: string;
    photo?: string;
    city?: string;
    savedExperiences?: (Types.ObjectId | Experience)[];
    bookedExperiences?: (Types.ObjectId | Experience)[];
    creator?: (Types.ObjectId | Creator);
    lastLogin: Date;
}

// Static methods
interface UserModel extends Model<User> {
    isValidPassword(password: string, passwordHash: string): boolean;
    generatePasswordHash(password: string): string;
}

const userSchemaFields: Record<keyof Omit<User, '_id'>, SchemaDefinitionProperty> = {
    fstName: {
        type: String,
        required: true,
        default: ''
    },

    lstName: {
        type: String,
        required: true,
        default: ''
    },

    birthday: Date,

    emailAddress: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        validate: /\(([0-9]{3})\) ([0-9]{3})-([0-9]{4})/
    },

    passwordHash: String,

    photo: String,

    city: String,

    savedExperiences: [{
        type: Schema.Types.ObjectId,
        ref: 'Experience'
    }],

    bookedExperiences: [{
        type: Schema.Types.ObjectId,
        ref: 'Experience'
    }],

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Creator'
    },

    lastLogin: {
        type: Date,
        default: new Date()
    }
}

const userSchema = new Schema<User, UserModel>(userSchemaFields);
userSchema.plugin(mongooseLeanDefaults);

/**
 * Verifies if the input password matches the hashed one.
 */
userSchema.static('isValidPassword', function isValidPassword(password: string, passwordHash: string) {
    return bcrypt.compareSync(password, passwordHash);
});

/**
 * Generates the password hash from the given password.
 */
userSchema.static('generatePasswordHash', function generatePasswordHash(password: string) {
    return bcrypt.hashSync(password, 10);
});

export default (models.User as UserModel) || model<User, UserModel>('User', userSchema);

//TODO: Write script to delete idle users