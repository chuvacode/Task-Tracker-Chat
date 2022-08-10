import {connect} from 'react-redux';
import NavSidebar from './NavSidebar';
import {chatSelectors} from '../../../state/chat';
import {RootState} from '../../../state/store';

type MapStateToProps = {
    countNewMessages: number
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
    countNewMessages: chatSelectors.getCountNewMessage(state),
});

const NavSidebarContainer = connect(mapStateToProps)(NavSidebar);

export default NavSidebarContainer;

