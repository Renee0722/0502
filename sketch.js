let capture;

function setup() {
  // 產生全螢幕的畫布，背景顏色為 f5ebe0
  createCanvas(windowWidth, windowHeight);
  background('#f5ebe0');

  // 擷取攝影機的影像
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上
}

function draw() {
  // 將攝影機影像顯示在視窗的中間
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  background('#f5ebe0');
}
