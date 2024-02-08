## 다시 만드는 백엔드 블로그

### 블로그 백엔드 프로젝트는 postman과 몽고디비로 이루어져 데이터베이스를 구축합니다.

### 해당 프로젝트는 node.js 호환성 문제로 오류가 발생해 임시 중단하였습니다. 다음은 로직에 대한 설명입니다.

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


## MongoDB

* 서버를 개발할 때 데이터베이스를 사용하면 웹 서비스에서 사용되는 데이터를 저장하고, 효율적으로 조회하거나 수정할 수 있습니다. 기존에는 mysql, oracleDB, postgreSQL 같은 관계형 데이터베이스를 자주 사용했습니다.

* 그런데 데이터베이스에는 몇 가지 한계가 있습니다.

* 첫번째는 데이터 스키마가 고정적이라는 것입니다. 여기서 스키마란 데이터 베이스에 어떤 형식의 데이터를 넣을지에 대한 정보를 가리킵니다. 예를 들어 회원 정보 스키마라면 계정명, 이메일, 이름 등이 되겠지요. 새로 등록하는 데이터 형식이 기존에 있던 데이터들과 다르다면? 기존 데이터를 모두 수정해야 새 데이터를 등록할 수 있습니다. 그래서 데이터 양이 많은 경우 데이터베이스의 스키마를 변경하는 작업이 매우 번거로워질 수 있습니다.

* 두번째는 확장성입니다. RDBMS는 저장하고 처리해야 할 데이터 양이 늘어나면 여러 컴퓨터에 분산시키는 것이 아니라, 해당 데이터베이스 서버의 성능을 업그레이드하는 방식으로 확장해주어야 했습니다. 

* 몽고디비는 이런 한계를 극복한 문서 지향적 nosql 데이터베이스입니다. 이 데이터베이스에 등록하는 데이터들은 유동적인 스키마를 지닐 수 있습니다. 종류가 같은 데이터라고 하더라도, 새로 등록해야할 데이터 형식이 바뀐다고 하더라도 기존 데이터까지 수정할 필요는 없습니다. 서버의 데이터 양이 늘어나도 한 컴퓨터에서만 처리하는 것이 아니라 여러 컴퓨터로 분산하여 처리할 수 있도록 확장하기 쉽게 되어있습니다.

* moongoose는 node.js 환경에서 사용하는 몽고디비 기반 ODM 라이브러리 입니다. 이 라이브러리는 데이터베이스 문서들을 자바스크립트 객체처럼 사용할 수 있게 해줍니다.

## dotenv
*  dotenv는 환경 변수들을 파일에 넣고 사용할 수 있게 하는 개발 도구입니다. moongoose를 사용하여 몽고디비에 접속할 경우, 서버에 주소나 계정 및 비밀번호가 필요한 경우도 있습니다. 이렇게 민감하거나 환경별로 달라질 수 있는 값은 코드 안에 직접 작성하지 않고, 환경변수로 설정하는 것이 좋습니다. 


#### postchtrl.js
```javascript
let postId = 1; // id의 초기값입니다.

// posts 배열 초기 데이터
const posts = [
    {
        id : 1,
        title : '제목',
        'body' : '내용',
    },
];

// 포스트 작성하기
export const write = ctx => {
    // REST API의 Request Body는 ctx.request.body에서 조회할 수 있습니다.
    const { title, body } = ctx.request.body;
    postId += 1; // 기존 postId 값에 1을 더합니다.
    const post = {
        id : postId,
        title : body
    };
    posts.push(post);
    ctx.body = post;
};

// 포스트 목록 조회
export const list = ctx => {
    ctx.body = posts;
}

// 특정 포스트 조회
export const read = ctx => {
    const { id } = ctx.params;
    // 주어진 id 값으로 포스트를 찾습니다.
    // 파라미터로 받아 온 값은 문자열 형식이므로 파라미터를 숫자로 변환하거나
    // 비교할 p.id 값을 문자열로 변경해야 합니다.
    const post = posts.find(p => p.id.toString() === id);
    // 포스트가 없으면 오류를 반환합니다.
    if (!post) {
        ctx.status = 404;
        ctx.body = {
            message : '포스트가 존재하지 않습니다.',
        };
        return;
    }
    ctx.body = post;
};

// 특정 포스트 제거
export const remove = ctx => {
    const {id} = ctx.params;
    // 해당 id를 가진 post가 몇 번째인지 확인합니다.
    const index = posts.findIndex(p => p.id.toString() === id);
    // 포스트가 없으면 오류를 반환합니다.
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message : '포스트가 존재하지 않습니다.',
        };
        return;
    };
    // index번 쨰 아이템을 제거합니다.
    posts.splice(index,1);
    ctx.status = 204; // No content
};

// 포스트 수정
export const replace = ctx => {
    // PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 경우 사용합니다.
    const {id} = ctx.params;
    // 해당 id를 가진 post가 몇 번째인지 확인합니다.
    const index = posts.findIndex(p => p.id.toString() === id);
    // 포스트가 없으면 오류를 반환합니다.
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message : '포스트가 존재하지 않습니다.',
        };
        return;
    };
    // 전체 객체를 덮어 씌웁니다.
    // 따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만듭니다.
    posts[index] = {
        id,
        ...ctx.request.body,
    };
    ctx.body = posts[index];
};

// 포스트 수정(특정 필드 변경)
export const update = ctx => {
    // PATCH 메서드는 주어진 필드만 교체합니다.
    const {id} = ctx.params;
    // 해당 id를 가진 post가 몇 번째인지 확인합니다.
    const index = posts.findIndex(p => p.id.toString() === id);
    // 포스트가 없으면 오류를 반환합니다.
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message : '포스트가 존재하지 않습니다.',
        };
        return;
    };
    // 전체 객체를 덮어 씌웁니다.
    // 따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만듭니다.
    posts[index] = {
      ...posts[index],
      ...ctx.request.body,  
    };
    ctx.body = posts[index];
}
```

* mongoose에는 스키마와 모델이라는 개념이 존재하는데, 이 둘은 혼동하기 쉽습니다. 스키마는 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체입니다. 이와 달리 모델은 스키마를 사용하여 만드는 인스턴스로, 데이터베이스에서 실제 작업을 처리할 수 있는 함수들을 지니고 있는 객체입니다.

## 스키마 생성

* 모델을 만드려면 사전에 스키마를 만들어 주어야 합니다. 우리는 블로그 포스트에 대한 스키마를 준비할 텐데, 어떤 데이터가 필요할 지 생각해봅시다.

**제목, 내용, 태그, 작성일**

* 포스트 하나에 이렇게 총 네 가지 정보가 필요합니다. 각 정보에 대한 필드 이름과 데이터 타입을 설정하여 스키마를 만듭니다.

