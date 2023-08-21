const {User} = require("../models")

exports.estateAgentApproval = async (req, res) => {

    // 바꾸려는 user_id 설정 
    // let 바꾸려는user_id/
    // const user_id = user_id
    
    // mutate 로 서버에서 요청 보낸 것 받기
    const { user_id } = req.body;

    
    try {
        await User.update(
            {
                certificate_user : 0
            },
            {
                where : {
                    user_id : user_id
                }
            }
        )
        return res.json({message : "성공"})
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}