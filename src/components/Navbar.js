import React, {Component, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';

class Navbar extends Component {

  render() {
    return (
      <Menu>
        <Menu.Item name='Home'><Link to='/'>Home</Link></Menu.Item>
        <Fragment>
          { !!localStorage.token ? (
            <Menu.Item name="LogOut" className='right' onClick={() => {
                localStorage.clear()
                return <Redirect to='/' />
              }}>Log Out</Menu.Item>
          ) : (
            <Menu.Item name="LogIn" className='right' ><Link to="/login">Log In</Link></Menu.Item>
          )}
        </Fragment>
      </Menu>
    )
  }
}

export default Navbar
