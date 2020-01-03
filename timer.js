function countDown(secs, elem) {
  var element = document.getElementById(elem);
  element.innerHTML = "00:"+secs;
  if(secs<10) {
    element.innerHTML = "00:0"+secs;
  }
  if(secs < 1) {
    clearTimeout(timer);
    element.innerHTML = 'Τέλος!'
  }
  secs--;
  var timer = setTimeout('countDown('+secs+',"'+elem+'")',1000);
}

countDown(12, "status");
