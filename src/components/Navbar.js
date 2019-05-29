import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {logoutUser, clearMembers, clearGroups, clearUsers} from '../redux/actionCreators'

class Navbar extends Component {

  render() {
    return (
      <Menu>
        <Menu.Item name='Home'><Link to='/'><img style={{width: 150, height: 50}} src='http://www.kumcgw.org/wp-content/uploads/2013/09/KUMCGW-logo_Final-Korean_small.png' alt=''/></Link></Menu.Item>
        <Menu.Item name='NewForm'><Link to='/newmember' >New Member</Link></Menu.Item>
        <Fragment>
          { !!localStorage.token ? (
            <>
              <Menu.Item name='AllMembers'><Link to='/members'>Manage New Members</Link></Menu.Item>
              {/*<Menu.Item name='SmallGroups'><Link to='/smallgroups'>Small Groups</Link></Menu.Item>*/}
              <Menu.Item name='SmallGroupList'><Link to='/smallgroups'>Small Groups</Link></Menu.Item>
              {/*<Menu.Item name='Orientation'><Link to='/orientation'>Orientation(optional)</Link></Menu.Item>*/}
              {
                this.props.user && this.props.user.user_type === 'admin' ? (
                  <Menu.Item name='ManageUsers'><Link to='/users'>Manage Users</Link></Menu.Item>
                ) : (
                  null
                )
              }
              <Menu.Item name="MyInfo" className='right'><Link to='/myinfo'>My Info</Link></Menu.Item>
              <Menu.Item name="LogOut" className='right' onClick={() => {
                  localStorage.clear()
                  this.props.logoutUser()
                  this.props.clearMembers()
                  this.props.clearGroups()
                  this.props.clearUsers()
                  this.props.history.push('/')
                }}>Log Out</Menu.Item>
              </>
          ) : (
            <Menu.Item name="LogIn" className='right' ><Link to="/login">Log In</Link></Menu.Item>
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
