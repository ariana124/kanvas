import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import NewPost from './post/NewPost';
import EditPost from './post/EditPost';
import SinglePost from './post/SinglePost';
import PrivateRoute from './auth/PrivateRoute';



const MainRouter = () => (
    <div>
        <Menu />
        {/* This allows for switching between components when we navigate to different URLs. */}
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/post/:postId" component={SinglePost}/>
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/signin" component={Signin}/>
            {/* Now only logged in users can view other people's profiles or edit their own profile. */}
            <PrivateRoute exact path="/user/:userId" component={Profile}/>
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
            <PrivateRoute exact path="/post/create" component={NewPost}/>
        </Switch>
    </div>
)

export default MainRouter;
