import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-setting">
                <div className="container"><NavLink className="navbar-brand" to="/"><span className="navbar-main">혜림사</span></NavLink><button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><NavLink exact className="nav-link" to="/">홈 <span className="sr-only">(current)</span></NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/about">혜림사 소개 <span className="sr-only">(current)</span></NavLink></li>
                        <li className="nav-item"><a className="nav-link" href="https://blog.naver.com/dghr2018">공지사항 <span className="sr-only">(current)</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="https://m.place.naver.com/place/1525898970/home">오시는 길 <span className="sr-only">(current)</span></a></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/band">커뮤니티 <span className="sr-only">(current)</span></NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/donate">불사 안내 <span className="sr-only">(current)</span></NavLink></li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;