const { Real_estate, User, Vote } = require("../models");

// 투표 가능한 매물 목록 반환(투표 완료한 매물 제외)


// 투표 결과 처리
const setVoteResult = async (real_estate_id, balance) => {
  try {
    const voteCount = await Vote.count({ where: { real_estate_id } });
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
    } else {
      // 허위매물
    }


  } catch (error) {
    console.log(error);
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
    if (voteCount >= Math.floor(estate.balance/10000000)) {

      setVoteResult(real_estate_id, estate.balance);

      // if () //
      // await Real_estate.update({accept : }, {where : {id : real_estate_id}});
    }
    console.log("매물의 balance", estate.balance);

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
    // 해당하는 매물 찾아서 for문 돌림. for문에서 setVoteResult 함수, 참여한 업자 보상 제공 함수 실행

  } catch (error) {
    console.log(error);

  }
}

//
