import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {logoutUser, clearMembers, clearGroups, clearUsers} from '../redux/actionCreators'

class Navbar extends Component {

  render() {
    return (
      <Menu>
        <Menu.Item name='Home' className='logo home'><Link to='/'><img style={{width: 150, height: 50}} src='http://www.kumcgw.org/wp-content/uploads/2013/09/KUMCGW-logo_Final-Korean_small.png' alt=''/></Link></Menu.Item>
        <Menu.Item name='NewForm'><Link to='/newmember' >New Member<br/>새가족</Link></Menu.Item>
        <Fragment>
          { (this.props.user && this.props.user.user_type !== 'new_user') || !!localStorage.token ? (
            <>
              {
                this.props.user && this.props.user.user_type !== 'new_user' ? (
                  <>
                    <Menu.Item name='AllMembers'><Link to='/members'>Manage New Members<br/>새가족 관리</Link></Menu.Item>
                    {/*<Menu.Item name='SmallGroups'><Link to='/smallgroups'>Small Groups</Link></Menu.Item>*/}
                    <Menu.Item name='SmallGroupList'><Link to='/smallgroups'>Small Groups<br/>속 관리</Link></Menu.Item>
                    {/*<Menu.Item name='Orientation'><Link to='/orientation'>Orientation(optional)</Link></Menu.Item>*/}
                  </>
                ) : (
                  null
                )
              }
              {
                this.props.user && this.props.user.user_type === 'admin' ? (
                  <Menu.Item name='ManageUsers'><Link to='/users'>Manage Users<br/>새가족팀관리</Link></Menu.Item>
                ) : (
                  null
                )
              }
              <Menu.Item name="MyInfo" id='rightmyinfo' className='right myinfo'><Link to='/myinfo'>My Info<br/>내 정보</Link></Menu.Item>
              <Menu.Item name="LogOut" id='logout' className='right Logout' onClick={() => {
                  localStorage.clear()
                  this.props.logoutUser()
                  this.props.clearMembers()
                  this.props.clearGroups()
                  this.props.clearUsers()
                  this.props.history.push('/')
                }}>Log Out</Menu.Item>
              </>
          ) : (
            <Menu.Item name="LogIn" className='right login' ><Link to="/login">Log In</Link></Menu.Item>
          )}
        </Fragment>
      </Menu>
    )
  }
}

const mapStateToProps = (store) => {
  return {user: store.user}
}

export default withRouter(connect(mapStateToProps, {logoutUser, clearMembers, clearGroups, clearUsers})(Navbar))
