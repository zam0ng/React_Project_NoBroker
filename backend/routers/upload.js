const router = require("express").Router();
const {Upload} =require("../middleware/imgUpload");
const {EstateInfo} =require("../controllers/uploadcontroller");
// router.post("/",Upload.array("upload"),(req,res)=>{

    
//     try {
//         console.log("----------------------req.files");
//         // console.log(req.files)
        
//         for (let index = 0; index < req.files.length; index++) {
           
//             console.log(req.files[index].path)
//         }
//         // console.log(req.body)
//         res.send("파일 저장됨");

//     } catch (error) {
//         console.log("upload 라우터에서 오류"+error);
//     }
// })
router.post("/",Upload.array("upload"),EstateInfo)
router.post("/estateInfo",EstateInfo);

module.exports = router;
