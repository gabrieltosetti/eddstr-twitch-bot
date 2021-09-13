import mongoose, { ConnectOptions } from 'mongoose';

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

const uri = process.env.MONGO_FULL_URL
    || `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin&retryWrites=true`;

mongoose
    .connect(uri)
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err));