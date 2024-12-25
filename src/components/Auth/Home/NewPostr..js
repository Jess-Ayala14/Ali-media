import React, { useState } from 'react';
import { Auth, API, Storage } from 'aws-amplify';

const NewPost = (PostState, access_tk) => {

    const newPostData = PostState;
    const access_token = access_tk;

    // Refactored newPost function
    async function newPost() {
        if (!newPostData.description || !newPostData.picture) {
            alert('Please provide a description and an image/video file.');
            return;
        }

        try {
            // Extract file name and extension
            const split = newPostData.picture.split('fakepath\\');
            newPostData.picture = split[1];
            const extension = newPostData.picture.split('.').pop().toLowerCase();

            // Get the URL from S3
            Storage.configure({ level: 'private' });
            const urlImg = await Storage.get('temp/' + newPostData.picture);

            if (newPostData.fb_checkbox) {
                await publishToFacebook(urlImg, extension);
            }

            if (newPostData.inst_checkbox) {
                await publishToInstagram(urlImg, extension);
            }

            alert('Post published successfully!');
        } catch (error) {
            showAlert('Error', `An error occurred while publishing the post: ${error.message}`);
        }
    }

    // Function to handle Facebook posting
    async function publishToFacebook(urlImg, extension) {
        const params = {
            access_token,
            message: newPostData.description,
        };

        if (['gif', 'jpeg', 'jpg', 'png'].includes(extension)) {
            params.url = urlImg;
        } else if (['mp4', 'mkv'].includes(extension)) {
            params.file_url = urlImg;
        } else {
            throw new Error('Unsupported file format for Facebook.');
        }

        const response = await new Promise((resolve, reject) => {
            window.FB.api(
                'me/photos',
                'POST',
                params,
                (response) => {
                    if (response && !response.error) {
                        resolve(response);
                    } else {
                        reject(response.error);
                    }
                }
            );
        });

        showAlert('Success', 'Post published successfully to Facebook!');
    }

    // Function to handle Instagram posting
    async function publishToInstagram(urlImg, extension) {
        const mediaParams = {
            access_token,
            caption: newPostData.description,
        };

        if (['gif', 'jpeg', 'jpg', 'png'].includes(extension)) {
            mediaParams.image_url = urlImg;
        } else if (['mp4', 'mkv'].includes(extension)) {
            mediaParams.video_url = urlImg;
        } else {
            throw new Error('Unsupported file format for Instagram.');
        }

        const instaIdResponse = await new Promise((resolve, reject) => {
            window.FB.api(
                'me?fields=instagram_business_account{id}',
                'GET',
                { access_token },
                (response) => {
                    if (response && response.instagram_business_account) {
                        resolve(response.instagram_business_account.id);
                    } else {
                        reject(response.error || 'No Instagram business account found.');
                    }
                }
            );
        });

        const mediaResponse = await new Promise((resolve, reject) => {
            window.FB.api(
                `${instaIdResponse}/media`,
                'POST',
                mediaParams,
                (response) => {
                    if (response && response.id) {
                        resolve(response.id);
                    } else {
                        reject(response.error);
                    }
                }
            );
        });

        await new Promise((resolve, reject) => {
            window.FB.api(
                `${instaIdResponse}/media_publish`,
                'POST',
                { access_token, creation_id: mediaResponse },
                (response) => {
                    if (response && !response.error) {
                        resolve(response);
                    } else {
                        reject(response.error);
                    }
                }
            );
        });

        showAlert('Success', 'Post published successfully to Instagram!');
    }

    // Helper function to show alerts
    function showAlert(title, message) {
        alert(`${title}: ${message}`);
    }

    newPost();
};

export default NewPost;
