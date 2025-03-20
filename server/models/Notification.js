import mongoose, {Schema} from "mongoose";

const NotificationSchema = new mongoose.Schema({
    organization_id: {type: Schema.Types.ObjectId, ref: "organizations"},
    event_id: {type: Schema.Types.ObjectId, ref: "events"},
    user_id: {type: Schema.Types.ObjectId, ref: "users"},
    content: {type: Schema.Types.String},
    status: {type: Schema.Types.String, default: "UNSEEN"},
    active: {type: Schema.Types.Boolean, default: true},

}, {
    timestamps: true,
    collection: "notifications",
});

export default mongoose.model("Notification", NotificationSchema);
