import { Router } from 'express';

const authRouter = Router();

// 안됨.. ㅠㅠ 에러남. req.session이 undefined
authRouter.get('/logout', (req, res, next) => {
  // req.logout((err) => {
  //   if (err) {
  //     return next(err);
  //   }
  // });
  console.log('이게 뭐지:', req.session.email); //undefined 해결해야함
  delete req.session.email;
  req.session.save(() => {
    res.redirect('/');
  });
});

authRouter.get('/login', async (req, res) => {
  const flashMsg = req.flash();
  // const feedBack = '';
  console.log(flashMsg);
  // if (flashMsg.error) {
  //   feedBack = flashMsg.error[0];
  // }
  // console.log(flashMsg);
  if (flashMsg.error) {
    return res.status(400).send(flashMsg);
  }
});

export { authRouter };
