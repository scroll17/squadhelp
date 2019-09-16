import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

import style from './AdminPage.module.sass';

import 'react-toastify/dist/ReactToastify.css';

import ListTo from '../../components/Admin/ListOfUsers/ListTo/ListTo';
import ListItem from '../../components/Admin/ListOfUsers/ListItem/ListItem';

import { getAllUser, banUserById } from "../../actions/actionCreators/adminActionCreator";

import { isEmpty } from 'lodash';

class AdminPage extends Component {
    clickToBan = (userId, isBanned) => {
        this.props.banUserById(userId, isBanned);
    };

    bannedUsers = (users) =>{
        return users.filter(user => {
            return user.isBanned
        });
    };

    userParser(list) {
        return list.map( user => {
            return (
                <ListItem
                    name={`${user.firstName} ${user.lastName}`}
                    status={user.isBanned}
                    role={user.role}
                    userAvatar={user.avatar}
                    id={user.id}
                    clickToItem={this.clickToBan}
                    key={user.email}
                />
            )
        });
    }

    render() {
        const { users } = this.props;

        return (
            <>
                <div className={style.list} onMouseDown={(e) => {e.preventDefault()}}>
                    <ListTo bannedUsers={this.bannedUsers(users)} clickToItem={this.clickToBan}/>
                    {this.userParser(users)}
                </div>
            </>
        )
    }

    componentDidMount() {
        const { users, user} = this.props;
        if(user && isEmpty(users)){
            this.props.getAllUser();
        }
    }
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user,
    users: state.adminReducer.users,
});
const mapDispatchToProps = dispatch => ({
    getAllUser: () => dispatch(getAllUser()),
    banUserById: (userId, isBanned) => dispatch(banUserById(userId, isBanned)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
