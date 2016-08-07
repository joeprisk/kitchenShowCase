# kitchen Show Case node app

This is my first attempt at writing a node app from scratch.
This is very much a playground, with a goal at some point. at the time of writing this doesn't do a great eal but has given me the foundations and pathway (in my head) I need to be able achieve what I want

## Aim

To be displayed on a touch screen interface placed on the wall of my kitchen, to display a series of photo's when in 'standby mode' and ability to share a recipe url for cooking when needed.

Aim is to use a raspberry pi in kiosk mode.

To display a slideshow from a given folder.

Ability to change folder, or upload new images to folder from webapp, and socket.io update slider

Ability to share url from webapp and have this displayed over slider for a given time period
Be able to reopen last closed url from slider interface

## Install
 ```shell
 cp config.example.js config.js
 ```

Edit the folder which to pull images from, more settings may be added in the future

Install npm dependencies
 ```shell
 npm install
 ```

Install bower dependencies
 ```shell
 bower install
 ```

To run node server
 ```shell
 npm run server
 ```
To run gulp foundation file watcher/builder
 ```shell
 npm start
 ```


A node app to display image slider from a given directory and also overlay an iframed url that can be shared from elsewhere. The thinking is to share a recipe to be displayed on the kitchen wall

