import mongoose, {Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
    organization_id: {type: Schema.Types.ObjectId, ref: "organizations"},
    first_name: {type: Schema.Types.String},
    last_name: {type: Schema.Types.String},
    email: {type: Schema.Types.String, unique: true},
    phone_no: {type: Schema.Types.String},
    type: {type: Schema.Types.String},
    password: {type: Schema.Types.String},
}, {
    timestamps: true,
    collection: "users",
});

export default mongoose.model("User", UserSchema);
