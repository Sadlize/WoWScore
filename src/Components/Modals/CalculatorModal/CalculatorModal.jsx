import React from 'react';
import './CalculatorModal.css'
import clsx from "clsx";

const CalculatorModal = ({children, visible, setVisible}) => {

    return (
        <div className={clsx('CalcModal', {'active': visible === true})} onClick={() => setVisible(false)}>
            <div className={'CalcModalContent'} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default CalculatorModal;
