import {connect} from 'react-redux';
import NavSidebar from './NavSidebar';

const mapStateToProps = state => {
  return {
    countNewMessages: state.chat.countNewMessages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const NavSidebarContainer = connect(mapStateToProps, mapDispatchToProps)(NavSidebar);

export default NavSidebarContainer;

