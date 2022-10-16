const multer=require('multer')

const uploadImage=(req,res,next)=>{
    const fileStorage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"./images");
            },
    
            filename:(req,file,cb)=>{
                cb(null, Date.now() + '--'+file.originalname )
            },
    }) 
    const upload=multer({storage:fileStorage})  
    multer({storage:fileStorage}).single('file')
    next()
}

module.exports= uploadImage