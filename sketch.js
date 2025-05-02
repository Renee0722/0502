let capture;
let overlayGraphics;

function setup() {
  // 產生全螢幕的畫布，背景顏色為 f5ebe0
  createCanvas(windowWidth, windowHeight);
  background('#f5ebe0');

  // 擷取攝影機的影像
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 使用 createGraphics 產生與攝影機影像一樣大小的圖形
  overlayGraphics = createGraphics(capture.width, capture.height);
  drawOverlayGraphics(); // 繪製 overlayGraphics 的內容
}

function draw() {
  // 將畫布的座標系統水平翻轉
  translate(width, 0);
  scale(-1, 1);

  // 將攝影機影像顯示在視窗的中間
  //image(capture, (width - capture.width) / 2, (height - capture.height) / 2);

  // 將 overlayGraphics 顯示在攝影機影像的上方
  image(overlayGraphics, (width - capture.width) / 2, (height - capture.height) / 2);
}

function drawOverlayGraphics() {
  // 設定背景顏色為黑色
  overlayGraphics.background(0);

  // 在寬與高每隔 20 單位繪製圓
  for (let x = 0; x < overlayGraphics.width; x += 20) {
    for (let y = 0; y < overlayGraphics.height; y += 20) {
      // 取得相對位置的顏色
      let col = capture.get(x, y);
      overlayGraphics.fill(col);
      overlayGraphics.noStroke();
      overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製寬高為 15 的圓
    }
  }
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  background('#f5ebe0');
}
