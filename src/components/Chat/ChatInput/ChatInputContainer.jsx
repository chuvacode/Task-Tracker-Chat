import {connect} from "react-redux";
import ChatInput from "./ChatInput";
import {sendMessage, updateTextNewMessage} from "../../../redux/chat-reducer";

let mapStateToProps = state => {
  return {
    textNewMessage: state.chat.textNewMessage
  };
};

const ChatInputContainer = connect(mapStateToProps, {
  updateTextNewMessage, sendMessage
})(ChatInput);

export default ChatInputContainer;

