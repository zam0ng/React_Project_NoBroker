const { Real_estate, User, Vote } = require("../models");


// 투표 결과 처리
const setVoteResult = async (real_estate_id, balance, seller) => {
  try {
    const { count:voteCount, rows: votes} = await Vote.findAndCountAll({ where: { real_estate_id } });
    // 미달
    if (voteCount < Math.floor(balance/10000000)) {
      // 미달 처리
      await Real_estate.update({accpet : 3}, {where : {real_estate_id}});
      return;
    }

    const trueCount = await Vote.count({
      where: { real_estate_id, result: true },
    });
    const falseCount = await Vote.count({
      where: { real_estate_id, result: false },
    });

    if (trueCount > falseCount) {
      // 정상매물
      await Real_estate.update({accpet : 1}, {where : {real_estate_id}});

    } else {
      // 허위매물
      await Real_estate.update({accpet : 2}, {where : {real_estate_id}});

      // seller fake_count 올리기
      const user = await User.findOne({where : {id : seller}});
      if (user.fake_count+1 >= 3) {
        await User.update({fake_count : user.fake_count+1, ban : true}, {where : {id : seller}});
      } else {
        await User.update({fake_count : user.fake_count+1}, {where : {id : seller}});
      }
    }

    // 투표에 참여한 업자들에게 보상 제공
    // votes.forEach(async (vote) => {
    //   console.log("vote", vote)
    //   console.log("vote user",vote.dataValues.user_id)
    //   const user = await User.findOne({where : {id : vote.dataValues.user_id}});
    //   await User.update({won : user.won + 1000}, {where : {id : vote.dataValues.user_id}});
    // });


  } catch (error) {
    console.log(error);
  }
}


// 투표 가능한 매물 목록 반환(투표 완료한 매물 제외)
exports.getEstate = async (req, res) => {
  try {
    // const user_id = req.decoded.id;
    const user_id = 1;

    // 해당 유저가 투표할 수 있는 등급인지 판별
    const user = await User.findOne({ where: { id: user_id } });
    if (user.certificate_user != 0) {
      return res.json({ message: "투표할 수 있는 권한이 없습니다." });
    }

    // 투표 가능한 매물 목록
    const estate = await Real_estate.findAll({
      where : {accpet : 0},
      include : [
        {model : Vote},
        {where : {user_id}},
        {required : false}
      ],
      having: Sequelize.literal('"Vote.id" IS NULL'),
    });

    console.log("아직 투표하지 않은 매물 목록", estate);
    return res.json({ estate });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
}


// 매물 허위/정상매물인지 투표
exports.voteEstate = async (req, res) => {
  try {
    // const user_id = req.decoded.id;
    const user_id = 1;

    const { real_estate_id, result } = req.body;

    // 해당 유저가 투표할 수 있는 등급인지 판별
    const user = await User.findOne({ where: { id: user_id } });
    if (user.certificate_user != 0) {
      return res.json({ message: "투표할 수 있는 권한이 없습니다." });
    }

    // 해당 매물이 투표할 수 있는 상황인지 판별(accpet 0이면 투표 가능)
    const estate = await Real_estate.findOne({ where: { id: real_estate_id } });
    if (estate.accept != 0) {
      return res.json({ message: "투표할 수 있는 매물이 아닙니다." });
    }

    // 투표 테이블 추가
    await Vote.create({ user_id, real_estate_id, result });

    const voteCount = await Vote.count({ where: { id: real_estate_id } });

    // 최대 투표수를 넘기면 투표 결과에 따른 처리
    if (voteCount >= Math.floor(estate.balance/10000000)) {
      setVoteResult(real_estate_id, estate.balance, estate.seller);
    }

    return res.json({ message: "성공" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};

// 투표 마감 기간이 (vote_end_date) 현재 날짜의 하루 전 날이면
// 해당하는 매물들 투표 결과 내기
// 미달 제외 참여한 업자에게 보상 제공
exports.setEstateAccept = async () => {
  try {
    const date = new Date(new Date().getDate()-1);

    // 해당하는 매물 찾아서 for문 돌림. for문에서 setVoteResult 함수, 참여한 업자 보상 제공 함수 실행
    const estateList = await Real_estate.findAll({where : {vote_end_date : date, accept:0}});

    for (let i = 0; i < estateList.length; i++) {
      let estate = estateList[i];
      (async () => {
        console.log("setEstateAccept estate",estate.dataValues.id, estate);
        await setVoteResult(estate.dataValues.id, estate.dataValues.balance, estate.dataValues.seller)
      })();
    }

    console.log("투표 마감기간인 매물 처리 완료");

  } catch (error) {
    console.log(error);

  }
}

