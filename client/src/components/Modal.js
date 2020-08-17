import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    return ReactDOM.createPortal(
        <div className="modal" onClick={props.onDismiss}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-header">{props.header}</h2>
                <h3 className="modal-text">{props.text}</h3>
                {props.actions}
            </div>
        </div>,
        document.querySelector('#modal')
    )
};

export default Modal;