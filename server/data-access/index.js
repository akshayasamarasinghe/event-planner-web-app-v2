import mongoose from "mongoose";

const mongo_uri = "mongodb+srv://akshayadevt:PXfTdar8qu9Hjaan@cluster-i.ne1fe.mongodb.net/event-planner-web-app?retryWrites=true&w=majority"

export const initDatabase = async () => {
    try {
        mongoose.Promise = global.Promise;
        mongoose.set("strictQuery", false);
        await mongoose.connect(mongo_uri, {});
        console.log("Mongo DB Connected");
    } catch (e) {
        console.error(e);
    }
};
