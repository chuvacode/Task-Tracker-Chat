import {connect} from "react-redux";
import Sidebar from "./Sidebar";
import {logout} from "../../redux/profile-reducer";

let mapStateToProps = state => ({
  profileName: state.profile.profileName,
  profileImage: state.profile.profileImage,
});

const SidebarContainer = connect(mapStateToProps, {
  logout
})(Sidebar);

export default SidebarContainer;

