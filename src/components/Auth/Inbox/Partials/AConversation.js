import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Card }
    from 'react-bootstrap';

import { createStore } from 'state-pool';
const store = createStore();

store.setState("Messages", [null]);

export const AConversation = (data) => {
    const ID = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const APICALLFB = "?fields=id,messages{message,from}";
    const [Messages, setMessages] = store.useState("Messages");

    useEffect(() => {

        allMessages();

    }, [ACCESS_TOKEN]);

     /*
    function allMessages() {
        window.FB.api(
            ID + APICALLFB,
            "GET",
            {
                access_token: ACCESS_TOKEN
            },
            function (response) {
                // Insert your code here
                //console.log(response);
                setMessages(format(getMessages(response)))

            }

        );

        function getMessages(response) {
            var messages = response['messages']['data'];
            //console.log(messages)
            return messages;
        }

        function format(messages) {
            const content = Object.keys(messages).map(key => {
                return (
                    [messages[key].id, messages[key].message, messages[key].from.name]
                );
            });

            //console.log(content);
            return content;

        };
    }*/

    function allMessages() {
    window.FB.api(
        ID + APICALLFB,
        "GET",
        {
            access_token: ACCESS_TOKEN
        },
        function (response) {
            if (response && !response.error) {
                // Si no hay errores en la respuesta, procesamos los mensajes
                setMessages(format(getMessages(response)));
            } else {
                // Manejo de errores
                console.error("Error fetching messages:", response.error);
                // Aquí podrías manejar el error de diferentes maneras, como mostrar un mensaje en la UI
            }
        }
    );

    function getMessages(response) {
        // Extraemos los mensajes de la respuesta
        var messages = response['messages']['data'];
        return messages;
    }

    function format(messages) {
        // Formateamos los mensajes para ser mostrados en la UI
        const content = Object.keys(messages).map(key => {
            return [
                messages[key].id, 
                messages[key].message, 
                messages[key].from.name
            ];
        });

        return content;
    }
}


    function GetMessages(props) {
        console.log(props)
        const messages = props.messages;
        const listItems = messages.map((message) =>
            <>
                {message != null &&
                    <>
                        <b>{message[2]}</b><h8>{message[1]}</h8>
                    </>
                }
            </>
        );

        return(
            <ul>{listItems}</ul>
        );
    }

    return (
        <>
            <GetMessages messages={Messages} />
            <p>Hello There {ID}</p>
        </>
    );


}

export default AConversation;