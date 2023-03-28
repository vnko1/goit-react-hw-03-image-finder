import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modal = document.querySelector('#modal-root');

export class Modal extends Component {
  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      modal
    );
  }
}
