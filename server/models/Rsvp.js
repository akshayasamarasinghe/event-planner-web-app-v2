import mongoose, {Schema} from "mongoose";

const RsvpSchema = new mongoose.Schema({
    organization_id: {type: Schema.Types.ObjectId, ref: "organizations"},
    event_id: {type: Schema.Types.ObjectId, ref: "events"},
    user_id: {type: Schema.Types.ObjectId, ref: "users"},
    status: {type: Schema.Types.String, default: "PENDING"},
    active: {type: Schema.Types.Boolean, default: true},

}, {
    timestamps: true,
    collection: "rsvps",
});

export default mongoose.model("Rsvp", RsvpSchema);
