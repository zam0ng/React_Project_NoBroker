const { Real_estate, User, Vote, sequelize } = require("../models");
const { Op } = require("sequelize");

// 투표 결과 처리
const setVoteResult = async (real_estate_id, balance, seller) => {
  try {
    const { count: voteCount, rows: votes } = await Vote.findAndCountAll({ where: { real_estate_id } });
    // 미달
    if (voteCount < Math.floor(balance / 10000000)) {
      // 미달 처리
      await Real_estate.update({ accpet: 3 }, { where: { id: real_estate_id } });
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
      console.log("정상 매물", trueCount, falseCount);
      await Real_estate.update({ accpet: 1 }, { where: { id: real_estate_id } });

    } else {
      // 허위매물
      console.log("허위 매물", trueCount, falseCount);
      await Real_estate.update({ accpet: 2 }, { where: { id: real_estate_id } });

      // seller fake_count 올리기
      const user = await User.findOne({ where: { id: seller } });
      if (user.fake_count + 1 >= 3) {
        await User.update({ fake_count: user.dataValues.fake_count + 1, ban: true }, { where: { id: seller } });
      } else {
        await User.update({ fake_count: user.dataValues.fake_count + 1 }, { where: { id: seller } });
      }
    }


    // 투표에 참여한 업자들에게 보상 제공
    const promises = votes.map(async (vote) => {
      console.log("vote user", vote.dataValues.user_id)
      const user = await User.findOne({ where: { id: vote.dataValues.user_id } });
      await User.update({ won: user.won + 1000 }, { where: { id: vote.dataValues.user_id } });
    })

    await Promise.all(promises);

  } catch (error) {
    console.log(error);
  }
}

// 투표 가능한 매물 목록 반환(투표 완료한 매물 제외)
exports.getEstate = async (req, res) => {
  try {
    const user_id = req.acc_decoded.id;
    // const user_id = 1;

    // 해당 유저가 투표할 수 있는 등급인지 판별
    const user = await User.findOne({ where: { id: user_id } });
    if (user.dataValues.certificate_user != 0) {
      return res.json({ message: "투표할 수 있는 권한이 없습니다." });
    }

    // 투표 가능한 매물 목록
    const votable = await Real_estate.findAll({
      where: { accpet: 0 },
      include: [
        {
          model: Vote,
          where: { user_id },
          required: false,
        }
      ],
      // having: sequelize.literal('"vote.id" IS NULL'),
      having: sequelize.literal("`Votes.id` IS NULL"),
    });

    console.log("아직 투표하지 않은 매물 목록", votable);
    return res.json({ votable });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
}


// 매물 허위/정상매물인지 투표
exports.voteEstate = async (req, res) => {
  try {
    const user_id = req.acc_decoded.id;
    // const user_id = 1;

    const { real_estate_id, result } = req.body;

    // 해당 유저가 투표할 수 있는 등급인지 판별
    const user = await User.findOne({ where: { id: user_id } });
    if (user.dataValues.certificate_user != 0) {
      return res.json({ message: "투표할 수 있는 권한이 없습니다." });
    }

    // 해당 매물이 투표할 수 있는 상황인지 판별(accpet 0이면 투표 가능)
    const estate = await Real_estate.findOne({ where: { id: real_estate_id } });
    if (estate.dataValues.accpet != 0) {
      console.log(estate);
      return res.json({ message: "투표할 수 있는 매물이 아닙니다." });
    }

    // 투표 테이블 추가
    await Vote.create({ user_id, real_estate_id, result });

    const voteCount = await Vote.count({ where: { real_estate_id } });

    // 최대 투표수를 넘기면 투표 결과에 따른 처리
    console.log("최대 투표수 : ", voteCount, Math.floor(estate.dataValues.balance / 10000000));
    if (voteCount >= Math.floor(estate.dataValues.balance / 10000000)) {
      console.log("최대 투표수 넘김", Math.floor(estate.dataValues.balance / 10000000));
      setVoteResult(real_estate_id, estate.dataValues.balance, estate.dataValues.seller);
    }

    return res.json({ message: "성공" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};

// 권한 확인
exports.checkAuthorization = async (req, res) => {
  try {
    const { certificate_user } = req.acc_decoded;

    if (certificate_user!=0) {
      return res.json({message : "권한 있음"});
    } else {
      return res.json({message : "권한 없음"});
    }
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
}

// 매물 투표했는지 여부 반환
exports.getUserVote = async (req, res) => {
  try {
    const user_id = req.acc_decoded.id;
    // const user_id = 1;
    const { real_estate_id } = req.params;

    const vote = await Vote.findOne({where : {user_id, real_estate_id}});

    const voteCount = await Vote.count({where : {real_estate_id}});
    const trueCount = await Vote.count({where : {real_estate_id, result : true}});
    const falseCount = await Vote.count({where : {real_estate_id, result : false}});
    const estate = await Real_estate.findOne({where : {id : real_estate_id}});

    let maxVote = Math.floor(estate.dataValues.balance / 10000000);
    if (maxVote==0) { maxVote = 1};

    return res.json({ vote, voteCounts : {voteCount, trueCount, falseCount, maxVote} });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
}


// 투표 마감 기간이 (vote_end_date) 현재 날짜의 하루 전 날이면
// 해당하는 매물들 투표 결과 내기
// 미달 제외 참여한 업자에게 보상 제공
exports.setEstateAccept = async () => {
  try {
    console.log("schedule 함수 실행");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // 해당하는 매물 찾아서 setVoteResult 함수, 참여한 업자 보상 제공 함수 실행
    const estateList = await Real_estate.findAll({
      where: {
        vote_end_date: {
          [Op.gte]: yesterday, // 어제 날짜 이상
          [Op.lt]: today,      // 오늘 날짜 미만
        },
      }, accpet: 0
    });
    console.log("estateList : ", estateList)

    const promises = estateList.map(async (estate) => {
      console.log("setEstateAccept estate", estate.dataValues.id, estate);
      await setVoteResult(estate.dataValues.id, estate.dataValues.balance, estate.dataValues.seller)
    });

    await Promise.all(promises);

    console.log("투표 마감기간인 매물 처리 완료");

  } catch (error) {
    console.log(error);
  }
}

