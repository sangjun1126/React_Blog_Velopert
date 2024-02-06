import Post from "../../models/post";

// 블로그 포스트를 작성하는 API인 write 구현하기
export const write = async ctx => {
    const {title, body, tags}  = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags
    });

    try {
        await post.save();
        ctx.body = post;
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const list = ctx => {};

export const read = ctx => {};

export const remove = ctx => {};

export const update = ctx => {};
