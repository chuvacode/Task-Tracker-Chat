import {connect} from "react-redux";
import Sidebar from "./Sidebar";

let mapStateToProps = state => {
  return {
    profileName: state.profile.profileName,
    profileImage: state.profile.profileImage,
  };
};

let mapDispatchToProps = dispatch => {
  return {
  };
};

const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);

export default SidebarContainer;

