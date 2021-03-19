/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
const Donate = () => {
    return (
        <div>
            <div className="index-full bg-3">
                <span className="index-topic">혜림사 불사 안내</span><br />
                <span className="index-desc">
                    혜림사 대웅전은 현재 기둥만 지어져 있는 미완공상태입니다. 
                    <br /><br />
                    따라서 혜림사 대웅전을 완공하기 위해 대웅전 완공 불사를 진행하려고 합니다.
                    <br /><br />
                    불자 여러분의 많은 참여 부탁드립니다.
                </span>
                <span className="index-desc">
                    불사 참가 방법: 계좌 이체
                    <br /><br />
                    아래 계좌번호 복사를 클릭하여 계좌번호를 복사하셔서 이체 해주시면 됩니다.
                    <br /><br />
                </span>
                <Link to="/donate" onClick={function(){prompt('Ctrl+C를 눌러 복사하세요.', '우체국 013276-01-006244 (혜림사)');void(0);}}className="index-button clip_btn">계좌번호 복사</Link>
            </div>
        </div>
    );
};

export default Donate;