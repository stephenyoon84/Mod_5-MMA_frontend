import React, {Component} from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {Grid} from 'semantic-ui-react';
import SmallGroups from './SmallGroups'
// import {URL} from '../redux/actionCreators';
import CreateGroup from './CreateGroup'

class SmallGroupList extends Component {
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
              this.props.user && (this.props.user.user_type === 'admin' || this.props.user.user_type === 'group_leader') ? (
                <Link to={'/smallgroups/creategroup'}><button>Create New Group</button></Link>
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
  user: store.user
})

export default connect(mapStateToProps)(SmallGroupList)
