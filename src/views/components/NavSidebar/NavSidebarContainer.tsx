import {connect} from 'react-redux';
import NavSidebar from './NavSidebar';
import {chatSelectors} from '../../../state/chat';
import {RootState} from '../../../state/store';

const NavSidebarContainer = connect()(NavSidebar);

export default NavSidebarContainer;

