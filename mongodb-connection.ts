import mongoose from 'mongoose';

const mongodbConnection = async () => {
    try {
        // Use current connection
        if (mongoose.connections[0].readyState) {
            return;
        }
    
        await mongoose.connect(process.env.MONGODB_URI!, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Mongoose connected');
        });
    } catch (err) {
        console.error(`MONGODB ERROR: ${err}`);
    }
}

export default mongodbConnection;