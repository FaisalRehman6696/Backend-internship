import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";


const OpenModal = ({ isOpen, selectedProduct, closeModal }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
    },
  };
  if (!selectedProduct) return null;
  const { title, description, image, price } = selectedProduct;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {}}
        style={customStyles}
         shouldCloseOnOverlayClick={true}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close </button>
        <h1>Modal</h1>

        <div className="modal-main">
          <div className="modal">
            <div className="modal-left">
              <img
                src={image}
                className="image-modal"
                width={100}
                height={100}
              />
            </div>

            <div className="modal-right">
              <h1 className="modal-title">Title:{title} </h1>
              <p className="modal-desc">Description:{description} </p>
              <h3>Price: ${price}</h3>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OpenModal;
