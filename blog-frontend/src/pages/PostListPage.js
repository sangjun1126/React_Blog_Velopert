import React from 'react';
import { Link } from 'react-router-dom'; // React Router의 Link 컴포넌트 사용
import Button from "../components/common/Button";

const PostListPage = () => {
    return (
        <div>
            <h1>Welcome to Our Movie Website</h1>
            <p>Discover the latest movies and TV shows</p>
            <Link to="/board">Go to Board</Link> {/* 게시판으로 이동하는 링크 */}
            <Button>버튼</Button>
        </div>
    );
}

export default PostListPage;
