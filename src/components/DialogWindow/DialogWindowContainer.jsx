import {connect} from "react-redux";
import DialogWindow from "./DialogWindow";

let mapStateToProps = state => {
  return {
    dialog: state.chat.dialogs[0],
    profileId: state.profile.profileId
  }
};

let mapDispatchToProps = dispatch => {
  return {}
};

let DialogWindowContainer = connect(mapStateToProps, mapDispatchToProps)(DialogWindow);

export default DialogWindowContainer;
