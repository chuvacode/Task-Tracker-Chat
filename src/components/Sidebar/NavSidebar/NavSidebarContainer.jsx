import {connect} from "react-redux";
import NavSidebar from "./NavSidebar";

let mapStateToProps = state => {
  return {
    countNewMessages: state.chat.countNewMessages
  };
};

let mapDispatchToProps = dispatch => {
  return {
  };
};

const NavSidebarContainer = connect(mapStateToProps, mapDispatchToProps)(NavSidebar);

export default NavSidebarContainer;

