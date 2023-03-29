import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import css from './Modal.module.css';

const modal = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onKeyClick: PropTypes.func.isRequired,
    onMouseClick: PropTypes.func.isRequired,
    totalImages: PropTypes.number.isRequired,
    currentPosition: PropTypes.number.isRequired,
    changeIndex: PropTypes.func.isRequired,
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillUnmount() {
    const { onKeyClick } = this.props;
    document.removeEventListener('keydown', onKeyClick);
  }

  render() {
    const {
      onMouseClick,
      changeIndex,
      totalImages,
      currentPosition,
      image: { largeImageURL, tags },
    } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={onMouseClick}>
        <div className={css.Modal}>
          <span
            className={css.Message}
          >{`${currentPosition}/${totalImages}`}</span>
          <button
            type="button"
            className={css.Button}
            onClick={() => changeIndex(-1)}
          >
            <MdArrowBackIos className={css.Icon} />
          </button>
          <img src={largeImageURL} alt={tags} width="1280" />
          <button
            type="button"
            className={css.Button}
            onClick={() => changeIndex(1)}
          >
            <MdArrowForwardIos className={css.Icon} />
          </button>
        </div>
      </div>,
      modal
    );
  }
}
