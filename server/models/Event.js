import mongoose, {Schema} from "mongoose";

const EventSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: "users"},
    title: {type: Schema.Types.String},
    description: {type: Schema.Types.String},
    start_date: {type: Schema.Types.Date},
    start_time: {type: Schema.Types.String},
    end_date: {type: Schema.Types.Date},
    end_time: {type: Schema.Types.String},
    image_url: {type: Schema.Types.String},
    category: {type: [Schema.Types.String]},
    rsvps: {type: [Schema.Types.Mixed]},

}, {
    timestamps: true,
    collection: "events",
});

export default mongoose.model("Event", EventSchema);
