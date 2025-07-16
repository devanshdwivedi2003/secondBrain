import mongoose,{Schema,model} from 'mongoose';

mongoose.connect(`${process.env.MONGODB_URI}/second-brain`)
const userSchema = new Schema({
    username: {type:String,unique:true},
    password: {type:String,required:true},
})

const contentschema = new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'tag'}],
    type:String,
    userId:{type:mongoose.Types.ObjectId,ref:'userschema',required:true},
})

const linkSchema =new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:'userschema',required:true},
})

export const usermodel=mongoose.model("user",userSchema);
export const contentsmodel=mongoose.model("content",contentschema);
export const  linkmodel=mongoose.model("link",linkSchema);