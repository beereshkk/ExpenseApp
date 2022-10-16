const express=require('express')
const router=express.Router()
const multer=require('multer')


const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const user=req.user
        cb(null,"../../expense-app/frontend/images");
        },

        filename:(req,file,cb)=>{
            const user=req.user
            cb(null, String(user._id) + '--'+file.originalname)
        },
}) 
const upload=multer({storage:fileStorage}) 


const userController=require('../app/controller/userController')
const categoryController=require('../app/controller/categoryController')
const budgetController=require('../app/controller/budgetController')
const expenseController=require('../app/controller/expenseController')
const findCategory=require('../app/middleware/findCategory')
const updateExpenses=require('../app/middleware/updateExpenses')
const encryptPassword=require('../app/middleware/encryptPassword')
const authenticateUser=require('../app/middleware/authenticateUser')
const uploadImage=require('../app/middleware/uploadImage')
router.get('/api/register',userController.showUser)
router.post('/api/register',encryptPassword,userController.createUser)  //create a middleware to set up uncategorised category by default
router.post('/api/login',userController.login)
router.put('/api/user/pic',authenticateUser,upload.single('file'),userController.uploadPic)

router.get('/api/categories',authenticateUser,categoryController.show)
router.get('/api/categories/:id',authenticateUser,categoryController.list)
router.post('/api/categories',authenticateUser,categoryController.create)
router.put('/api/categories/:id',authenticateUser,categoryController.update)
router.delete('/api/categories/:id',authenticateUser,findCategory,updateExpenses,categoryController.remove)  //set up middleware to first update the category of expense to uncategorised and later delete

router.get('/api/budget',authenticateUser,budgetController.show)
router.post('/api/budget',authenticateUser,budgetController.create)
router.put('/api/budget/:id',authenticateUser,budgetController.update)
//router.delete('/api/budget',budgetController.remove)

router.get('/api/expenses',authenticateUser,expenseController.list)
router.get('/api/expenses/deleted',authenticateUser,expenseController.deletedExpenses)
router.put('/api/expenses/undo/:id',authenticateUser,expenseController.undo)
router.get('/api/expenses/:id',authenticateUser,expenseController.show)
router.post('/api/expenses',authenticateUser,expenseController.create)
router.put('/api/expenses/:id',authenticateUser,expenseController.update)
router.delete('/api/expenses/:id',authenticateUser,expenseController.remove)


module.exports=router