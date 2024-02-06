## Koa 애플리케이션 사용하기

* koa 애플리케이션은 미들웨어의 배열로 구성되어 있습니다. 조금 전 코드에서 app.use함수를 사용했습니다. 이 함수는 미들웨어 함수를 어플리케이션에 등록합니다.

* 미들웨어 함수는 다음과 같은 구조로 이루어져 있습니다.

```javascript
(ctx, next) => {}
```

* koa의 미들웨어 함수는 두 개의 파라미터를 받습니다. 첫 번째 파라미터는 조금 전에도 사용한 ctx라는 값이고, 두 번째 파라미터는 next 입니다.

* ctx는 context의 줄임말로 웹 요청과 응답에 관한 정보를 지니고 있습니다. next는 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수입니다. 미들웨어를 등록하고 next 함수를 호출하지 않으면 그 다음 미들웨어를 처리하지 않습니다.

* 만약 미들웨어에서 next를 사용하지 않으면 ctx => {}와 같은 형태로 파라미터에 next를 설정하지 않아도 괜찮습니다. 주로 다음 미들웨어를 처리할 필요가 없는 라우트 미들웨어를 나중에 설정할 경우 이러한 구조로 next를 생략하여 미들웨어를 작성합니다.

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(ctx.url);
    console.log(1);
    if (ctx.query.authorized !== '1') {
        ctx.status = 401; // unauthorized
        return;
    }
    await next();
    console.log("END");
});

app.use((ctx, next) => {
    console.log(2);
    next();
});

app.use(ctx => {
    ctx.body = 'hello world';
});

app.listen(4000, () => {
    console.log("Listening on port 4000");
});
`
``

* KOA 알아보기 로직 2

```javascript
const koa = require('koa');
const Router = require('koa-router');
const app = new koa();
const router = new Router();

// 라우터 설정하기
router.get('/', ctx => {
    ctx.body = '홈';
})

router.get('/about/:name', ctx => {
    const {name} = ctx.params;
    // name의 존재 유무에 따라 다른 결과를 출력합니다.
    ctx.body = name ? `${name}의 소개` : '소개';
});

router.get('/posts', ctx => {
    const {id} = ctx.query;
    // id의 존재 유무에 따라 다른 결과를 출력합니다.
    ctx.body = id? `포스트 #${id}` : '포스트 아이디가 없습니다.';
});

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('listening on port 4000');
});
```

## REST API

* 웹 어플리케이션을 만들려면 데이터 베이스의 정보를 입력하고 읽어 와야 합니다. 그런데 웹 브라우저에서 데이터베이스에 직접 접속하여 데이터를 변경한다면 보안상 문제가 됩니다. 그래서 REST API를 만들어서 사용합니다.

* 클라이언트가 서버에 자신이 데이터를 조회 생성 삭제 업데이트 하고싶다고 요청하면, 서버는 필요한 로직에 따라 데이터베이스에 접근하여 작업을 처리합니다.

* REST API는 요청 종류에 따라 다른 HTTP 메서드를 사용합니다. HTTP 메서드는 여러 종류가 있으며 주로 사용하는 메서드는 GET, POST, PUT, DELETE, PATCH입니다.