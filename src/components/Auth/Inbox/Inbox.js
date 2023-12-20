import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import List from './Partials/List';
import { Container, Row, Tab }
    from 'react-bootstrap';
import { createStore } from 'state-pool';
import './Inbox.css'


const store = createStore();
store.setState("token", '');

const Inbox = () => {

    let [state, setState] = useState(null);
    const [loginFB, setlogin] = useState(false);
    const [access_token, savingtoken] = store.useState("token")


    useEffect(() => {

        scriptFB()
        if (loginFB === true && access_token === '') {
            queryToken();
        }

        (async () => {
            try {
                const response = await Auth.currentAuthenticatedUser()
                setState(response)
            } catch (err) {
                console.error(err)
                setState(null)
            }
        })()

    }, [loginFB]);

    function queryToken() {

        window.FB.api(
            "me?fields=accounts{access_token}",
            "GET",
            function (response) {
                // Insert your code here
                response = response["accounts"]['data'][0]['access_token']
                getToken(response)
            }
        );
    }

    function getToken(token) {
        savingtoken(token)
    }

    const scriptFB = () => {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "801174264382809",
                cookie: true,
                xfbml: true,
                version: 'v18.0'
            });

            window.FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });


        };

        function checkLoginState() {
            window.FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });

        }

        function statusChangeCallback(response) {
            if (response.status === 'connected') {
                console.log('Logged in and authenticated');
                setlogin(true);

                // testAPI();
            } else {
                console.log('Not authenticated');
                setlogin(false);

            }

        }

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0&appId=801174264382809&autoLogAppEvents=1";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


    }

    if (loginFB === true && access_token === '') {
        queryToken();
    }



    return (
        <div className='Inbox'>
            <Container>
                <br />
                <Row className='row-tab-md-lg'>
                    <Tab.Container id="left-tabs" defaultActiveKey="main">
                       {<List dataFromParent={[loginFB, access_token]} />}
                    </Tab.Container>
                </Row>
            </Container>
        </div>
    )
}

export default Inbox