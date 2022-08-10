import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import {authOperations, authSelectors} from '../../../state/auth';
import {RootState} from '../../../state/store';
import React from 'react';
import {compose} from 'redux';

const mapStateToProps = (state: RootState) => ({
    profileName: authSelectors.getProfileName(state),
    profileImage: authSelectors.getProfileImage(state),
});

type MapStateToProps = ReturnType<typeof mapStateToProps>;

type MapDispatchToProps = {
    logout: () => void
}

type Props = MapStateToProps & MapDispatchToProps;

const SidebarContainer: React.FC<Props> = (props: Props) => {
    return <Sidebar {...props}/>;
};

export default compose(
    connect<MapStateToProps, MapDispatchToProps, unknown, RootState>(mapStateToProps, {
        logout: authOperations.logout,
    }),
)(SidebarContainer);
