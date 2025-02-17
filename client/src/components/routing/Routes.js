import React from 'react'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Alert from '../layout/Alert'
import Dashboard from '../dashboard/Dashboard'
import PrivateRoute from '../routing/PrivateRoute'
import CreateProfile from '../profile-forms/CreateProfile'
import EditProfile from '../profile-forms/EditProfile'
import AddExperience from '../profile-forms/AddExperience'
import AddEducation from '../profile-forms/AddEducation'
import Profiles from '../profiles/Profiles'
import Profile from '../Profile/Profile'
import Posts from '../posts/Posts'
import Post from '../Post/Post'
// import Folder from '../../Folder Structure/Foldergpt'
// import Notfound from '../layout/Notfound'

const Routes = () => {
  return (
    <div>
      <section className='container'>
        <Alert />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          {/* <Route exact path='/folder' component={Folder}/> */}
          {/* <Route component={Notfound} /> */}
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute
            exact
            path='/create-profile'
            component={CreateProfile}
          />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          <PrivateRoute
            exact
            path='/add-experience'
            component={AddExperience}
          />
          <PrivateRoute exact path='/add-education' component={AddEducation} />
          <PrivateRoute exact path='/posts' component={Posts} />
          <PrivateRoute exact path='/posts/:id' component={Post} />
        </Switch>
      </section>
    </div>
  )
}

export default Routes
