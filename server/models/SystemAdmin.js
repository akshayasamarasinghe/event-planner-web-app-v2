import mongoose, {Schema} from "mongoose";

const SuperAdminSchema = new mongoose.Schema({
    first_name: {type: Schema.Types.String},
    last_name: {type: Schema.Types.String},
    email: {type: Schema.Types.String, unique: true},
    phone_no: {type: Schema.Types.String},
    password: {type: Schema.Types.String},
}, {
    timestamps: true,
    collection: "system_admins",
});

export default mongoose.model("SuperAdmin", SuperAdminSchema);
