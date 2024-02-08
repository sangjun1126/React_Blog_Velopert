const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('body-parser');
const api = require('./api');

const app = new Koa();
const router = new Router();

// 라우터 설정하기
router.use('/api', api.routes()) // api 라우트 적용하기

// 라우터 적용 전에 bodyparser 적용
app.use(bodyParser());

// app 인스턴스에 라우터를 적용합니다.
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('listening on port 4000');
});