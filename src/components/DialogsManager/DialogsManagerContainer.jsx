import {connect} from "react-redux";
import DialogsManager from "./DialogsManager";
import {setActiveDialogAC} from "../../redux/chat-reducer";

let mapStateToProps = state => {
  return {
    dialogs: state.chat.dialogs,
    activeType: state.chat.activeType,
    currentDialogID: state.chat.currentDialogID,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    setActiveDialog(dialogID) {
      dispatch(setActiveDialogAC(dialogID));
    }
  };
};

const DialogsManagerContainer = connect(mapStateToProps, mapDispatchToProps)(DialogsManager);

export default DialogsManagerContainer;

