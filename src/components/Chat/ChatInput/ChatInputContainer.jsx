import {connect} from "react-redux";
import ChatInput from "./ChatInput";
import {addNewMessageAC, updateTextNewMessageAC} from "../../../redux/chat-reducer";

let mapStateToProps = state => {
  return {
    textNewMessage: state.chat.textNewMessage
  };
};

let mapDispatchToProps = dispatch => {
  return {
    updateTextNewMessage(text) {
      dispatch(updateTextNewMessageAC(text));
    },
    addNewMessage() {
      dispatch(addNewMessageAC())
    }
  };
};

const ChatInputContainer = connect(mapStateToProps, mapDispatchToProps)(ChatInput);

export default ChatInputContainer;

