import React from 'react';

const SpinnerScreenLoad = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', gap: '20px' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className='fs-2'>Carregando....</p>
        </div>
    );
}

export default SpinnerScreenLoad;
