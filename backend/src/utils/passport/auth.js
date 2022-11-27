module.exports = {
  isOwner: function (req, res) {
    console.log('auth에 데이터 오니', req.user);
    if (req.user.email) {
      return true;
    } else {
      return false;
    }
  },
  status: function (req, res) {
    const currentStatus = `로그아웃 상태임, login 보여줘`;
    if (this.isOwner(req, res)) {
      console.log(req.user.email, '로그인 상태임, logout 보여줘');
    }
    return console.log(currentStatus);
  },
};
