const mongoose=require('mongoose');
const UserDetailsSchema = new mongoose.Schema(
    {
        name:String,        
        email:{type: String, unique:true},
        password:String,
    },
    {
        collection:"users",
    });

    module.exports = mongoose.model("users", UserDetailsSchema);