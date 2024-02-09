require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const {PORT, MONGO_URI} = process.env;

const api = require('./api');

const app = new Koa();
const router = new Router();

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB')
})
.catch(e => {
    console.error(e);
})

// 라우터 설정하기
router.use('/api', api.routes()) // api 라우트 적용하기

// 라우터 적용 전에 bodyparser 적용
app.use(bodyParser());

// app 인스턴스에 라우터를 적용합니다.
app.use(router.routes()).use(router.allowedMethods());

// PORT가 지정되어 있지 않다면 4000을 사용
const port = PORT || 4000;
app.listen(4000, () => {
    console.log('listening on port 4000');
});