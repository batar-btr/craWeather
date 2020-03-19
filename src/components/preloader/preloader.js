import React from 'react';
import './preloader.css'

const Preloader = () => {
    return (
        <div className='preloader'>
            <div>
                {/* <div className="loadingio-spinner-eclipse-kj7qfmda5jg">
                    <div className="ldio-bx0qupiz2k">
                        <div></div>
                    </div>
                </div> */}
                <h1>Loading<span className='dot1'>.</span><span className='dot2'>.</span><span className='dot3'>.</span></h1>
            </div>

        </div>
    );
}
export default Preloader;