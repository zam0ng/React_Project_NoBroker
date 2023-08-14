const {
  Real_estate,
  User,
  Likes,
  Comment,
  Recomment,
  Transaction,
  Vote
} = require("../models");

// 매물 상세 정보 반환
exports.getEstate = async (req, res) => {
  try {
    const { id } = req.params;
    // const user_id = req.decoded.id;
    const user_id = 1;

    const estate = await Real_estate.findOne({
      where: { id },
      // include: { model: Comment, order:[['createdAt', 'DESC']], include: [{ model: Recomment, order : [['createdAt', 'DESC']], include : {model : User, attributes : ['user_name', 'user_img']} }, {model : User, attributes : ['user_name', 'user_img']}] },
      include: { model: Comment, include: [{ model: Recomment, include: { model: User, attributes: ['user_name', 'user_img'] } }, { model: User, attributes: ['user_name', 'user_img'] }] },
    });

    let user_like = false;
    // 로그인 되어 있으면
    if (user_id) {
      // 찜 여부 반환
      const like = await Likes.findOne({
        where: { user_id, real_estate_id: id },
      });
      if (like) {
        user_like = true;
      }
    }
    const likes = await Likes.count({ where: { real_estate_id: id } });

    // 허위 매물 업로드 경력
    const seller = await User.findOne({ attributes: ['id', 'user_name', 'phone', 'fake_count', 'user_img'], where: { id: estate.seller } });

    // 투표 여부 반환
    let vote = await Vote.findOne({ where: { real_estate_id: id, user_id } })
    vote ? vote = true : vote = false;

    return res.json({ estate, like: { user_like, likes }, seller, vote });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};

// 매물 조회수 올리기
exports.viewEstate = async (req, res) => {
  try {
    const { id } = req.params;

    // 조회수 올리기
    const estate = await Real_estate.findOne({ where: { id } });
    console.log("조회수", id, estate)
    await Real_estate.update({ views: estate.views + 1 }, { where: { id } });

    return res.json({ message: "성공" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
}

// 매물 구매 신청
exports.buyEstate = async (req, res) => {
  try {
    // const buyer = req.decoded.id;
    const buyer = 1;
    const { real_estate_id, transaction_date } = req.body;

    const estate = await Real_estate.findOne({ where: { id: real_estate_id } });
    const user = await User.findOne({ where: { id: buyer } });

    // 구매가능한 매물이 아니면
    if (estate.state != 0) {
      return res.json({ message: "거래할 수 없는 매물입니다." });
    }

    console.log("user.won - user.disabled_won", user.won - user.disabled_won);
    console.log(
      "estate.deposit + estate.balance",
      estate.deposit + estate.balance
    );

    // 신청자에게 계약금&잔금 없으면
    if (user.won - user.disabled_won < estate.deposit + estate.balance) {
      return res.json({ message: "돈 부족" });
    }

    // 신청자에게 계약금&잔금 있으면 거래 신청 진행

    // 매물 거래 신청
    // estate 거래 요청으로 업데이트
    await estate.update({ state: 1 }, { where: { id: real_estate_id } });

    // 거래 테이블 생성
    await Transaction.create({
      buyer,
      seller: estate.seller,
      real_estate_id,
      transaction_date,
    });

    // 사용자 계약금 빠져나가고 잔금 사용 불가능
    await User.update(
      {
        won: user.won - estate.deposit,
        disabled_won: user.disabled_won + estate.balance,
      },
      { where: { id: buyer } }
    );

    return res.json({ message: "성공" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};

// 매물 찜
exports.likeEstate = async (req, res) => {
  try {
    // const user_id = req.decoded.id;
    const user_id = 1;
    const { real_estate_id } = req.body;

    await Likes.create({ user_id, real_estate_id });

    return res.json({ message: "성공" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};

// 매물 찜 취소
exports.delLikeEstate = async (req, res) => {
  try {
    // const user_id = req.decoded.id;
    const user_id = 1;
    const { real_estate_id } = req.body;

    await Likes.destroy({ where: { user_id, real_estate_id } });

    return res.json({ message: "성공" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};

// 댓글 작성
exports.postComment = async (req, res) => {
  try {
    // const user_id = req.decoded.id;
    const user_id = 1;
    const { real_estate_id, content } = req.body;

    await Comment.create({ user_id, real_estate_id, content });

    return res.json({ message: "성공" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};

// 대댓글 작성
exports.postRecomment = async (req, res) => {
  try {
    // const user_id = req.decoded.id;
    const user_id = 1;
    const { comment_id, re_content } = req.body;

    await Recomment.create({ user_id, comment_id, re_content });

    return res.json({ message: "성공" });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};
