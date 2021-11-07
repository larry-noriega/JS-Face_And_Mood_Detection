# JS-Face_Detection
 Simply JavaScript real-time face expression & landmark detector using [FaceAPI.js](https://github.com/justadudewhohacks/face-api.js) library

![faceapi](https://user-images.githubusercontent.com/31125521/57224752-ad3dc080-700a-11e9-85b9-1357b9f9bca4.gif)

 ## To run these project
 
 You can run this project on your local machine. Just pull it down and do the following:

1. Clone or download repository.

![cloneimage](https://github.com/larry-noriega/JS-Face_Detection/blob/master/assets/img/Clone.png?raw=true)

or

``` bash
git clone https://github.com/larry-noriega/JS-Face_Detection.git
```
### Start the Project

2. Open folder with [vscode IDE](https://github.com/Microsoft/vscode/).

![vscode](https://user-images.githubusercontent.com/35271042/118224532-3842c400-b438-11eb-923d-a5f66fa6785a.png)

3. Install & activate recommended extensions
   
![recomended_extensions](https://tattoocoder.com/content/images/2019/08/Screen-Shot-2019-08-14-at-2.53.11-PM.png)

### Run live server

4. Open index.html & Go live on [http://127.0.0.1:5500/](http://127.0.0.1:5500/)

![live_server](https://github.com/ritwickdey/vscode-live-server/raw/master/images/Screenshot/vscode-live-server-statusbar-3.jpg)


# IMPORTANT: Bug Fixes

## `navigator.getUserMedia`

`navigator.getUserMedia` is now deprecated.

Replaced `navigator.getUserMedia` with `navigator.mediaDevices.getUserMedia`

## Low-end Devices Bug

Video eventListener for `play` fires up too early before the video is fully loaded, which causes errors to pop up from the Face API and ends in the script death. 

(tested on Debian [Firefox] and Windows [Chrome, Firefox]). Replaced by `playing` event, which fires up when the media has enough data to start playing.

## Log
- 06/11/2021: Updates:
  - Old browsers compatibility.
  - Minify version added.
- 14/08/2021: Modern browsers compatibility.
- 12/07/2020: Bug Fixes:
  - `navigator.getUserMedia` deprecated in modern browsers.
  - `play` event: Low-ending devices bug.
- 07/07/2020: Instructions & VScode extensions recommendations. 
- 09/04/2019: Innitial Commit.
  
  
# Disclaimer

### Common issue:
 Right clicking the file and opening in Chrome will not work.

Many people are running into is a 404 error when loading the models folder. & is caused when you the code is not running inside a server that loads the models folder.

Use Live Server like VSCode integrated to get the most of this project.


