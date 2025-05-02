let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#f5ebe0');

  // 啟用攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  overlayGraphics = createGraphics(capture.width, capture.height);
}

function draw() {
  // 將畫布的座標系統水平翻轉
  translate(width, 0);
  scale(-1, 1);

  // 將攝影機影像顯示在畫布上
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2);

  // 更新 overlayGraphics
  drawOverlayGraphics();

  // 將 overlayGraphics 顯示在攝影機影像的上方
  image(overlayGraphics, (width - capture.width) / 2, (height - capture.height) / 2);
}

function drawOverlayGraphics() {
  // 確保攝影機影像已準備好
  if (capture.width === 0 || capture.height === 0) {
    return;
  }

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
