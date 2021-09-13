import mongoose from 'mongoose';
import userValidation from '../models/validations/User';
import { ValidationResult } from '@hapi/joi'

interface UserDoc extends mongoose.Document {
    name: string;
    password: string;
    email: string;
}

interface userModelInterface extends mongoose.Model<UserDoc> {
    validateAndBuild(attr: any): UserDoc
    getValidation(attr: any): ValidationResult
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        min: [6, 'Mínimo de 6 caracteres'],
        max: [255, 'Máximo de 255 caracteres'],
    },
    email: {
        type: String,
        required: true,
        min: [6, 'Mínimo de 6 caracteres'],
        max: [255, 'Máximo de 255 caracteres'],
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Mínimo de 6 caracteres'],
        max: [1024, 'Máximo de 1024 caracteres'],
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

userSchema.statics.validateAndBuild = (attr: any) => {
    return new UserModel(attr);
}
userSchema.statics.getValidation = (attr: any) => {
    return userValidation(attr);
}

const UserModel = mongoose.model<UserDoc, userModelInterface>('User', userSchema);

export { UserModel };
