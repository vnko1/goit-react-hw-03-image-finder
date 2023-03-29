import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import css from './Modal.module.css';

const modal = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    totalImages: PropTypes.number.isRequired,
    currentPosition: PropTypes.number.isRequired,
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
    toggleModal: PropTypes.func.isRequired,
    changeCurrentIndex: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyClick);
  }

  onKeyClick = async e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
    if (e.code === 'ArrowRight') {
      this.props.changeCurrentIndex(1);
    }
    if (e.code === 'ArrowLeft') {
      this.props.changeCurrentIndex(-1);
    }
  };

  onMouseClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const {
      changeCurrentIndex,
      totalImages,
      currentPosition,
      image: { largeImageURL, tags },
    } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.onMouseClick}>
        <div className={css.Modal}>
          <span
            className={css.Message}
          >{`${currentPosition}/${totalImages}`}</span>
          <button
            type="button"
            className={css.Button}
            onClick={() => changeCurrentIndex(-1)}
          >
            <MdArrowBackIos className={css.Icon} />
          </button>
          <img src={largeImageURL} alt={tags} width="1280" />
          <button
            type="button"
            className={css.Button}
            onClick={() => changeCurrentIndex(1)}
          >
            <MdArrowForwardIos className={css.Icon} />
          </button>
        </div>
      </div>,
      modal
    );
  }
}
