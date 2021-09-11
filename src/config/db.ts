import mongoose, { ConnectOptions } from 'mongoose';

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const uri = process.env.MONGO_FULL_URL
    || `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin&retryWrites=true`;

mongoose
    .connect(uri, options)
    .then(() => console.log('MongoDB is connected'))
    .catch(err => console.log(err));