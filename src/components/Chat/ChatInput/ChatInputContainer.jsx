import {connect} from "react-redux";
import ChatInput from "./ChatInput";
import {addNewMessage, updateTextNewMessage} from "../../../redux/chat-reducer";

let mapStateToProps = state => {
  return {
    textNewMessage: state.chat.textNewMessage
  };
};

const ChatInputContainer = connect(mapStateToProps, {
  updateTextNewMessage, addNewMessage
})(ChatInput);

export default ChatInputContainer;

