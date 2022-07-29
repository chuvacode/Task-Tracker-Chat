import {connect} from "react-redux";
import DialogWindow from "./DialogWindow";

let mapStateToProps = state => {
  return {
    dialog: (state.chat.dialogs.filter(dialog => {
      if (dialog.id === state.chat.currentDialogID) {
        return dialog;
      }
    }))[0],
    profileId: state.profile.profileId
  }
};

let mapDispatchToProps = dispatch => {
  return {}
};

let DialogWindowContainer = connect(mapStateToProps, mapDispatchToProps)(DialogWindow);

export default DialogWindowContainer;
