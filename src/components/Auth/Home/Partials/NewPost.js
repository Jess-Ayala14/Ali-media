import React, { useState } from 'react';
import { Auth, API, Storage } from 'aws-amplify';


const NewPost = (PostState, access_tk) => {

    const newPostData = PostState;
    const access_token = access_tk

    async function newPost() {

        if (!newPostData.description && !newPostData.picture) return;

        console.log('FB' + newPostData.fb_checkbox, 'inst' + newPostData.inst_checkbox)

        const split = newPostData.picture.split("fakepath\\");
        newPostData.picture = split[1];
        const new_split = newPostData.picture.split(".");
        const extension = new_split[1];

        //console.log(newPostData.picture, ' ', extension)

        Storage.configure({ level: 'private' })
        const urlImg = await Storage.get('temp/' + newPostData.picture);

        async function fbPosting() {
            if (extension === 'gif' || extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
                console.log('picture')

                var params = {
                    //Page Token with publish_pages (to post as Page)
                    access_token: access_token,
                    //status message
                    message: newPostData.description,
                    //absolute url to the image, must be public
                    url: urlImg,

                };

                window.FB.api(
                    "me?fields=id",
                    "GET",
                    {
                        access_token: access_token
                    },
                    function (response) {
                        // Insert your code here
                        post_picture(response.id)

                    }
                );

                function post_picture(page_id) {
                    window.FB.api(
                        page_id + '/photos?',
                        'POST',
                        params,
                        function (response) {
                            console.log(urlImg, response)
                            if (response['id'] !== '') {
                                setTimeout(function () {
                                    alert("FB: Publication was successful")
                                }, 5000)
                            }
                            else {
                                alert("FB:", toString(response))
                            }
                        }
                    );

                }
            }
            else if (extension === 'mp4' || extension === 'mkv') {
                console.log('video')
                params = {
                    //Page Token with publish_pages (to post as Page)
                    access_token: access_token,
                    //status message
                    description: newPostData.description,
                    //absolute url to the image, must be public
                    file_url: urlImg,

                };

                window.FB.api(
                    "me?fields=id",
                    "GET",
                    {
                        access_token: access_token
                    },
                    function (response) {
                        // Insert your code here
                        post_video(response.id)

                    }
                );

                function post_video(page_id) {
                    window.FB.api(
                        page_id + '/videos?',
                        'POST',
                        params,
                        function (response) {

                            console.log(urlImg, response)
                            if (!response.error) {
                                setTimeout(function () {
                                    alert("FB: Publication was successful")
                                }, 7000)
                            }
                            else {
                                alert("FB Error: Publication was Unsuccesful")
                            }
                        }
                    );
                }
            }
        }

        async function instPosting(params) {

            window.FB.api(
                "me?fields=instagram_business_account{id}",
                "GET",
                {
                    access_token: access_token
                },
                function (response) {
                    // Insert your code here
                    media(response["instagram_business_account"]["id"])

                }
            );

            function media(insta_id) {
                window.FB.api(
                    insta_id + '/media',
                    'POST',
                    params,
                    async function (response) {
                        console.log(response)

                        if (response['id'] !== '') {
                            setTimeout(function () {
                                alert("Inst: Publication was successful")
                                media_publish(insta_id, response.id)
                            }, 8000)


                        }
                        else {
                            alert("Inst: ", toString(response))
                        }
                    }
                );
            }

            function media_publish(insta_id, id_media) {

                window.FB.api(
                    insta_id + '/media_publish',
                    'POST',
                    {
                        access_token: access_token
                    },
                    { "creation_id": id_media },
                    function (response) {
                        console.log("Media Posted:", response)
                    }
                );

            }
        }

        if (newPostData.fb_checkbox === true && newPostData.inst_checkbox == false) {
            fbPosting().then(
                setTimeout(function () {
                    window.location.reload()
                }, 12000)
            );
        }
        else if (newPostData.fb_checkbox === false && newPostData.inst_checkbox === true) {

            var params = ''

            if (extension === 'gif' || extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
                console.log('picture')
                params = {
                    //Page Token with publish_pages (to post as Page)
                    access_token: access_token,
                    //status message
                    caption: newPostData.description,
                    //absolute url to the image, must be public
                    image_url: urlImg,

                };
            }
            else if (extension === 'mp4' || extension === 'mkv') {
                console.log('video')
                params = {
                    //Page Token with publish_pages (to post as Page)
                    access_token: access_token,
                    //status message
                    caption: newPostData.description,
                    //absolute url to the image, must be public
                    video_url: urlImg,
                    media_type: 'VIDEO'
                };
            }
            instPosting(params).then(
                setTimeout(function () {
                    window.location.reload()
                }, 12000)
            )
        }
        else if (newPostData.fb_checkbox === true && newPostData.inst_checkbox === true) {

            if (extension === 'gif' || extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
                console.log('picture')
                params = {
                    //Page Token with publish_pages (to post as Page)
                    access_token: access_token,
                    //status message
                    caption: newPostData.description,
                    //absolute url to the image, must be public
                    image_url: urlImg,

                };
            }
            else if (extension === 'mp4' || extension === 'mkv') {
                console.log('video')
                params = {
                    //Page Token with publish_pages (to post as Page)
                    access_token: access_token,
                    //status message
                    caption: newPostData.description,
                    //absolute url to the image, must be public
                    video_url: urlImg,
                    media_type: 'VIDEO'
                };
            }

            fbPosting().then(instPosting(params).then(
                setTimeout(function () {
                    window.location.reload()
                }, 14000)
            ))
        }

    }

    newPost();

}

export default NewPost;