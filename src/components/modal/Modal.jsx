import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
  Overlay,
  ModalContainer,
  CurrentPageText,
  Button,
  ArrowBack,
  ArrowForward,
} from './Modal.styled';

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

  onKeyClick = e => {
    const { toggleModal, changeCurrentIndex } = this.props;
    if (e.code === 'Escape') {
      toggleModal();
    }
    if (e.code === 'ArrowRight') {
      changeCurrentIndex(1);
    }
    if (e.code === 'ArrowLeft') {
      changeCurrentIndex(-1);
    }
  };

  onMouseClick = e => {
    const { toggleModal } = this.props;
    if (e.target === e.currentTarget) {
      toggleModal();
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
      <Overlay onClick={this.onMouseClick}>
        <ModalContainer>
          <CurrentPageText>{`${currentPosition}/${totalImages}`}</CurrentPageText>
          <Button type="button" onClick={() => changeCurrentIndex(-1)}>
            <ArrowBack />
          </Button>
          <img src={largeImageURL} alt={tags} width="1280" />
          <Button type="button" onClick={() => changeCurrentIndex(1)}>
            <ArrowForward />
          </Button>
        </ModalContainer>
      </Overlay>,
      modal
    );
  }
}
