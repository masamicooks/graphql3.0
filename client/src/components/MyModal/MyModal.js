import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  myModal: {
    "& :focus": {
      outline: "none",
    },
  },
  paper: {
    position: "absolute",
    width: theme.isMobile ? "90vw" : "500px",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MyModal = (props) => {
  const { isModalOpen, setIsModalOpen } = props;
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        className={classes.myModal}
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {props.children}
        </div>
      </Modal>
    </div>
  );
};

MyModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
};

export { MyModal };
