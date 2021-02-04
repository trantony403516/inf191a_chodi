import React from'react';
import {auth} from './firebase';

export const UserContext = React.createContext({user: null});

class FirebaseProvider extends React.Component {
    state = {
        user:null
    };
    componentDidMount = () => {
        auth.onAuthStateChanged(function(user) {
            //this.setState({ user: user });
            if(user) {
                localStorage.setItem("user", "IN");
            }
            else {
                localStorage.removeItem("user");
            }
          });
    };
    render () {
        return (
            <UserContext.Provider value={this.state.user}>
            {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default FirebaseProvider;