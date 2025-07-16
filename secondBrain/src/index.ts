import express from 'express';
import  jwt  from 'jsonwebtoken';
import { contentsmodel, linkmodel, usermodel } from './db';
import { userMiddleware } from './middleware';
import { random } from './utils';
const app = express();

app.use(express.json());
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.post('/api/v1/signup', async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;
    try {
         await usermodel.create({
            username,
            password,
         })

         res.json({
             message:'Signup successful',
         })
    } catch (error) {
        res.status(411).json({
            message:'Signup failed!! Username already exists',
        })
        
    }
})

app.post('/api/v1/signin', async (req, res) => {
    const username=req.body.username;
    const password=req.body.password;

    const existinguser = await usermodel.findOne({
        username,
        password,
    })

    if(existinguser) {
        const token =jwt.sign({
            id:existinguser._id
        },process.env.JWT_SECRET as string)

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message:'Invalid username or password',
        })
    }
})


app.post('/api/v1/content',userMiddleware, async (req, res) => {
        const link=req.body.link;
        const type=req.body.type;
        await contentsmodel.create({
            link,
            type,
            title:req.body.title,
            userId:req.userId,
            tags:[],
        })

    })
app.get('/api/v1/content',userMiddleware, (req, res) => {

    const userId=req.userId;
    const content=contentsmodel.find({
        userId:userId
    }).populate("userId","username")
    res.json({
        content
    })
})
app.delete('/api/v1/content',userMiddleware, async (req, res) => {
    const contentId=req.body.contentId;
     await contentsmodel.deleteMany({
        contentId,
        userId:req.userId
    })
    res.json({
        message:'Content deleted successfully'
    })

})

app.post('/api/v1/brain/share', async (req, res) => {
    const share=req.body.share;
    if(share){
        const existinglink= await linkmodel.findOne({
            userId:req.userId,
        })
        if(existinglink){
            res.json({
                hash:existinglink.hash,
            })
            return;
        }
        const hash=random(10);
        await linkmodel.create({
            userId:req.userId,
            hash:hash,
        })
        res.json({
            hash,
        })

    }else{
        await linkmodel.deleteOne({
            useId:req.userId,
        });
        res.json({
            message:"Link deleted successfully",
        })
    }

})

app.post('/api/v1/brain/:shareLink', async(req, res) => {
    const hash=req.params.shareLink;
    const link=await linkmodel.findOne({
        hash,
    })

    if(!link){
        res.status(404).json({
            message:"Link not found",
        })
        return;
    }

    const content=await contentsmodel.findOne({
        userId:link.userId,
    })

    const user=await usermodel.findOne({
        _id:link.userId,
    })

    if(!user){
        res.status(411).json({
            message:"User not found",
        })
        return;
    }
    res.json({
        content,
        user:user.username,
    })

    

})
app.listen(3000)
