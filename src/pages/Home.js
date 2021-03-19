import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
        <div className="index index-full">
            <span className="index-topic">혜림사</span>
            <span className="index-desc"></span>
            <Link to="/about" className="index-button">혜림사 소개</Link>&nbsp;&nbsp;
            <a href="https://blog.naver.com/dghr2018" className="index-button">공지사항</a>&nbsp;&nbsp;
            <a href="https://m.place.naver.com/place/1525898970/home" className="index-button">오시는 길</a>&nbsp;&nbsp;
            <Link to="/band" className="index-button">커뮤니티</Link>
        </div>
        </div>
    );
};

export default Home;