import swal from 'sweetalert2';
import React from 'react';
import home from '../home2.jpg'
import {auth} from './Firebase/firebase'

function signOut(){
    auth.signOut().then(function() {
        // Sign-out successful.
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        swal.fire({
            type: 'successfull',
            title: 'Signed Out', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("/landing");
            }, 1000)
        });
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal.fire({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}

class Signout extends React.Component {
      render() {
        return(
            <div>
<button style = {{"margin-top":"20%"}} class="btn btn-outline-secondary text-uppercase" onClick = { () => {signOut()}}>
                                Sign Out<small></small></button>
                                </div>
        );
      }
}

export default Signout;