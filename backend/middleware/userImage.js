const multer = require("multer");
const path = require("path");

exports.userImg = multer({
    
    storage : multer.diskStorage({
        destination : (req,file,save) =>{
            // uploads : 폴더명
            save(null,"imgs/userImg/")
        },

        filename :(req,file,done) =>{
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname) +"_" + Date.now() + ext;
            done(null,filename);
        }
    }),
    
});

