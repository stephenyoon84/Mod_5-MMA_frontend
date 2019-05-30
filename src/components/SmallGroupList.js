import React, {Component} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {Grid, Form, Button} from 'semantic-ui-react';
import SmallGroups from './SmallGroups'
import {URL, fetchingGroups} from '../redux/actionCreators';
import CreateGroup from './CreateGroup'

class SmallGroupList extends Component {
  state = {}

  leaderOptions = () => {
    return this.props.users.filter(u => u.user_type === 'group_leader').map(l => {
      return {key: l.name, text: l.name, value: l.name}
    })
  }

  leaderChange = (e, d) => {
    this.setState({leader: d.value})
  }

  handleCreateGroup = (e) => {
    let leader = this.state.leader
    let name = e.target.parentElement.name.value
    let token = localStorage.getItem('token')
    let group = {name: name, user_name: leader}
    fetch(URL + '/groups', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        group: group
      })
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }

  handleResponse = json => {
    if (json["success"]) {
      this.props.fetchingGroups()
      alert(json['message'])
      this.props.history.push('/smallgroups/2019')
    } else {
      alert(json['message'])
    }
  }

  render() {
    let years = [...new Set(this.props.groups.map(g => g.year))]
    return (
      <div className='ui grid'>
        <div className='row'>
          <Grid.Column width={2}>
            <ul>
              {years.map(y => {
                return <li key={y}><Link to={`/smallgroups/${y}`} >{y}</Link></li>
              })}
            </ul>
            {
              this.props.user && (this.props.user.user_type === 'admin') ? (
                  <Form>
                    <Form.Input name='name'/>
                    <Form.Select style={{minWidth: 0}} options={this.leaderOptions()} onChange={this.leaderChange}/>
                    <Button onClick={this.handleCreateGroup}>Create New Group</Button>
                  </Form>
              ) : (
                null
              )
            }
          </Grid.Column>
          <Grid.Column width={14}>
            <Switch>
              {years.map(y => {
                return <Route key={y} path={`/smallgroups/${y}`} render={(props)=><SmallGroups targetYear={y} {...props} />} />
              })}
              <Route path={'/smallgroups/creategroup'} component={CreateGroup} />
            </Switch>
          </Grid.Column>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  groups: store.groups,
  user: store.user,
  users: store.users
})

export default connect(mapStateToProps, {fetchingGroups})(SmallGroupList)
