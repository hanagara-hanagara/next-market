import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://introoutro0326:OhDj2vVnR1p4brV6@cluster0.mjwme.mongodb.net/nextMarket?retryWrites=true&w=majority');
        console.log('Success: Connected to MongoDB');
    } catch (err) {
        console.log('Failure: Unconnected to MongoDB >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        throw new Error();
    }
};
export default connectDB;
