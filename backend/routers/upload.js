const router = require("express").Router();
const {Upload} =require("../middleware/imgUpload");

router.post("/",Upload.array("uploadd"),(req,res)=>{
    console.log("----------------------req.files");
    console.log(req.files);
    const {file, body}= req;

    console.log("-------------file");
    console.log(file);
    console.log("-------------body");
    console.log(body);
    
    res.send("파일 저장됨");
})
module.exports = router;
