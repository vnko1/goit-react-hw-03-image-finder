import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modal = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onKeyClick: PropTypes.func.isRequired,
    onMouseClick: PropTypes.func.isRequired,
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
