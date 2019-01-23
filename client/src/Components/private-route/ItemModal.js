import React, { Component } from "react";
// import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
// import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
// mport SaveIcon from '@material-ui/icons/Save';
import { connect } from "react-redux";
import { addItem } from "../../actions/itemActions";
// import uuid from "uuid";
// import { socket } from "./App";
// import TextField from "@material-ui/core/TextField";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
    placeholder: "Type a message"
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if(e.target.value !== ""){
      e.target.style.borderBottom = "2px solid #63de68";
    } 
    else{
      e.target.style.borderBottom = "2px solid rgb(197, 208, 197)";
    }
  };
  onEnter = e => {
    if (e.key === "Enter") {
      this.onSubmit(e);
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      userName: this.props.auth.user.username,
      userId: this.props.auth.user.id
    };
    this.props.addItem(newItem);
    this.toggle();
    this.setState({ name: "" });
    // socket.emit("update", { message: newItem });
    // console.log(uuid());
  };

  render() {
    return (
      <div
        className="chatFooter"
        style={{
          display: "flex",
          outline: "none",
          marginTop: "7px",
          position: "relative"
        }}
      >
        <textarea
          className="inputArea"
          placeholder={this.state.placeholder}
          onChange={this.onChange}
          name="name"
          autoComplete="off"
          spellCheck="false"
          value={this.state.name}
          style={{
            "margin": "0px 11px 0px 18px",
            "left": "10px",
            "resize": "none",
            "backgroundColor": "rgb(255, 253, 253)",
            "height": "34px",
            "outline": "none",
            "border": "navajowhite",
            "borderBottom": "2px solid rgb(197, 208, 197)",
            "borderRadius": "5px"
          }}
        />
        <button
          className="sendButton"
          onClick={this.onSubmit}
          style={{
            width: "100px",
            display: "table-cell",
            border: "none",
            color: "white",
            backgroundColor: "#2996f7",
            borderRadius: "5px",
            fontSize: "16px",
            fontFamily: "verdana",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
