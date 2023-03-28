import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modal = document.querySelector('#modal-root');

export class Modal extends Component {
  componentWillUnmount() {
    const { onKeyClick } = this.props;
    document.removeEventListener('keydown', onKeyClick);
  }

  render() {
    const {
      onMouseClick,
      image: { largeImageURL, tags },
    } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={onMouseClick}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modal
    );
  }
}
