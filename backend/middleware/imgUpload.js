const multer = require("multer");

const path = require("path");

exports.Upload = multer({
    
    storage : multer.diskStorage({
        destination : (req,file,qwer) =>{
            console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ")
            console.log(file);
            console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ")
            
            // qwer(null,"imgs/estate")
            // qwer(null,path.join("uploads/"))

            // uploads : 폴더명
            // qwer(null,"uploads/")
            qwer(null,"imgs/estate/")
            // qwer(null,path.join(__dirname,"imgs","estate"))
            // qwer(null, path.join(__dirname, "imgs\\estate"));

        },

        filename :(req,file,done) =>{

            const ext = path.extname(file.originalname);

            const filename = path.basename(file.originalname,ext) +"_" + Date.now() + ext;

            done(null,filename);
        }
    }),

    limits : {fileSize:5 * 1024 * 1024},
});

