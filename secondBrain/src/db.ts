import mongoose,{Schema,model} from 'mongoose';

mongoose.connect('mongodb+srv://devansh:<MCMeB8CTlaWGIWct>@cluster0.u6gixfu.mongodb.net/');

const userSchema = new Schema({
    username: {String,unique:true},
    password: {String,required:true},
})

const contentschema = new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'tag'}],
    type:String,
    userId:{type:mongoose.Types.ObjectId,ref:'user',required:true},
})

const linkSchema =new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:'user',required:true,unique:true},
})

export const usermodel=model("user",userSchema);
export const contentsmodel=model("content",contentschema);
export const  linkmodel=model("link",linkSchema);