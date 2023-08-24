const multer = require("multer");

const path = require("path");


exports.Upload = multer({
    
    storage : multer.diskStorage({
        destination : (req,file,qwer) =>{
        
            // uploads : 폴더명
            qwer(null,"imgs/estate/")
        },

        filename :(req,file,done) =>{

            const ext = path.extname(file.originalname);

            const filename = path.basename(file.originalname,ext) +"_" + Date.now() + ext;

            done(null,filename);
        }
    }),

    limits : {fileSize:5 * 1024 * 1024},
});

exports.updateUpload = multer({
    
    storage : multer.diskStorage({
        destination : (req,file,qwer) =>{
        
            // uploads : 폴더명
            qwer(null,"imgs/userImg/")
        },

        filename :(req,file,done) =>{

            const ext = path.extname(file.originalname);

            const filename = path.basename(file.originalname,ext) +"_" + Date.now() + ext;

            done(null,filename);
        }
    }),

    limits : {fileSize:5 * 1024 * 1024},
});


