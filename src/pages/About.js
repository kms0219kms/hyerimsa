/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const About = () => {
    var addactive = () => {
        document.getElementById('about').classList.add('active');
    }
    return (
        <div onLoad={addactive}>
            <div className="index-small bg-3">
                <div className="jumbotron">
                    <center style={{margin: '0'}}>
                    <strong><span className="index-topic">혜림사 소개</span><br /></strong>
                    <img src="/static/assets/img/sunim/dokwang.jpeg" width="300px" height="100%" style={{borderRadius: '70%'}} /><p style={{color: '#fff', fontSize: '20px'}}><br />도광스님</p>
                    <a href="tel:050714941080" className="index-button">전화하기 (0507-1494-1080)</a><br /><br />
                    <a href="sms:01093031080" className="index-button">문자 남기기 (010-9303-1080)</a><br /><br />
                    <a href="https://www.facebook.com/people/%EB%8F%84%EA%B4%91%EC%8A%A4%EB%8B%98/100034320885339" className="index-button">페이스북 바로가기</a><br /><br />
                    <br /><br />
                    <img src="/static/assets/img/sunim/gwangwoo.jpeg" width="300px" height="100%" style={{borderRadius: '70%'}} /><p style={{color: '#fff', fontSize: '20px'}}><br />광우스님</p>
                    <p style={{color: '#fff', fontSize: '17px'}}>
                    1999 해인사로 출가<br /><br />


                    1999 해인사에서 사미계 수계<br /><br />


                    2007 기본 교리 수료<br /><br />


                    2008 직지사에서 비구계 수계<br /><br />


                    2011 송광사 율학승가대학원 졸업<br /><br />


                    2015 "BTN열린법회 운명을 바꾸는 법" 방송<br /><br />


                    2016~ 현재 화계사 교무스님<br /><br />


                    2016~ 현재 "광우스님의 소나무" 방송<br /><br />


                    2019~2020 "광우스님의 마음수행법회" 방송<br /><br />

                    2020 "법보신문 광우스님의 불보살가피" 연재<br /><br />


                    현) 혜림사 수자스님<br /><br />
                    </p>
                    <a href="/gwmenu/index.html" className="index-button">광우스님 메뉴 연결</a><br /><br />
                    </center></div>
                </div>
        </div>
    );
};

export default About;