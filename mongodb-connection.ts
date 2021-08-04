import mongoose from 'mongoose';

let cachedConnection: typeof mongoose | undefined = undefined;

const mongodbConnection = async () => {
    try {
        if (cachedConnection) {
            return cachedConnection;
        }
    
        cachedConnection = await mongoose.connect(process.env.MONGODB_URI!, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then(mongoose => {
            console.log('Mongoose connected');
            return mongoose;
        });
        return cachedConnection;
    } catch (err) {
        console.error(`MONGODB ERROR: ${err}`);
    }
}

export default mongodbConnection;