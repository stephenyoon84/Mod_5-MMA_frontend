import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {logoutUser, clearMembers, clearGroups} from '../redux/actionCreators'

class Navbar extends Component {

  render() {
    return (
      <Menu>
        <Menu.Item name='Home'><Link to='/'>Home</Link></Menu.Item>
        <Menu.Item name='NewForm'><Link to='/newmember' >New Member</Link></Menu.Item>
        <Fragment>
          { !!localStorage.token ? (
            <>
              <Menu.Item name='AllMembers'><Link to='/members'>All Members</Link></Menu.Item>
              <Menu.Item name='SmallGroups'><Link to='/smallgroups'>Small Groups</Link></Menu.Item>
              {/*<Menu.Item name='Orientation'><Link to='/orientation'>Orientation(optional)</Link></Menu.Item>*/}
              <Menu.Item name="LogOut" className='right' onClick={() => {
                  localStorage.clear()
                  this.props.logoutUser()
                  this.props.clearMembers()
                  this.props.clearGroups()
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

export default withRouter(connect(mapStateToProps, {logoutUser, clearMembers, clearGroups})(Navbar))
