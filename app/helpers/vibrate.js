export default function vibrate(duration) {

    var vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

    if (vibrate) {
        vibrate(duration);
    }

}