# 20250502上課筆記

![exported_qrcode_image_600](https://hackmd.io/_uploads/BkiF16-lle.png)

https://renee0722.github.io/0502/
---
## 第一條指令
```tex
產生全螢幕的畫布，背景顏色為f5ebe0
擷取攝影機的影像，正常顯示在視窗的中間
影像畫面為視窗大小的80%
請把程式碼寫在sketch.js內
```

說明：
1. createCanvas(windowWidth, windowHeight)：建立全螢幕畫布。
1. background('#f5ebe0')：設定背景顏色為 #f5ebe0。
1. createCapture(VIDEO)：啟用攝影機並擷取影像。
1. capture.size(windowWidth * 0.8, windowHeight * 0.8)：將影像大小設為視窗的 80%。
1. image(capture, x, y)：將影像繪製在畫布上，並置中顯示。
1. windowResized：當視窗大小改變時，重新調整畫布大小並保持背景一致。

---
### 程式碼
```javascript=
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

```
## 第二條指令
```tex
攝影機顯示的畫面左右顛倒，請調整
```
說明：
1. translate(width, 0)：將畫布的原點移動到右上角。
1. scale(-1, 1)：水平翻轉畫布的座標系統，實現影像左右翻轉。
1. image(capture, x, y)：繪製翻轉後的影像，仍然置中顯示。
---
### 程式碼
```javascript=
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
  // 將畫布的座標系統水平翻轉
  translate(width, 0);
  scale(-1, 1);

  // 將攝影機影像顯示在視窗的中間
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  background('#f5ebe0');
}

```

## 第三條指令

```tex
利用createGraphics指令，產生一個與video視訊畫面一樣的寬高、一樣的大小內容，該圖片顯示在視訊畫面的上方
```
說明：
1. createGraphics(capture.width, capture.height)：建立一個與攝影機影像大小相同的圖形緩衝區。
1. overlayGraphics.fill(255, 0, 0, 100)：設定紅色半透明填充。
1. overlayGraphics.ellipse(...)：在圖形緩衝區中繪製一個圓形作為示例。
1. image(overlayGraphics, x, y)：將 overlayGraphics 繪製在攝影機影像的上方。
---
### 程式碼
```javascript=
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
  overlayGraphics.fill(255, 0, 0, 100); // 設定紅色半透明填充
  overlayGraphics.noStroke();
  overlayGraphics.ellipse(overlayGraphics.width / 2, overlayGraphics.height / 2, 100, 100); // 畫一個圓形
}

function draw() {
  // 將畫布的座標系統水平翻轉
  translate(width, 0);
  scale(-1, 1);

  // 將攝影機影像顯示在視窗的中間
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2);

  // 將 overlayGraphics 顯示在攝影機影像的上方
  image(overlayGraphics, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  background('#f5ebe0');
}
```

## 第四條指令

```tex
把overlayGraphics的背景顏色為黑色
overlayGraphics在寬與高每隔20為一個單位
在每個單位內產生一個寬高為15的圓
圓的顏色圓的顏色採用overlayGraphics相對位子的顏色
```
說明：
1. overlayGraphics.background(0)：將 overlayGraphics 的背景設為黑色。
1. capture.get(x, y)：取得攝影機影像在 (x, y) 位置的顏色。
1. overlayGraphics.ellipse(x + 10, y + 10, 15, 15)：在每個單位內繪製寬高為 15 的圓，圓的顏色採用 capture.get(x, y) 的顏色。
1. drawOverlayGraphics()：負責繪製 overlayGraphics 的內容。
---
### 程式碼
```javascript=
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

```

## 第五條指令

```tex
取消在overlayGraphics每個單位上的圓圈
改為寬為18的方框，中間有個5的圓
圓的顏色為黑色方框採用overlayGraphics相對位子的顏色
```
說明：
1. 繪製方框：使用 overlayGraphics.rect(x + 1, y + 1, 18, 18) 繪製寬高為 18 的方框。方框的顏色採用 capture.get(x, y) 取得的顏色。
1. 繪製中間的圓：使用 overlayGraphics.ellipse(x + 10, y + 10, 5, 5) 繪製直徑為 5 的圓。圓的顏色設定為黑色。
1. 調整位置：方框與圓的位置以單位格的中心為基準，確保圓位於方框的正中央。

---
### 程式碼
```javascript=
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

  // 在寬與高每隔 20 單位繪製方框與圓
  for (let x = 0; x < overlayGraphics.width; x += 20) {
    for (let y = 0; y < overlayGraphics.height; y += 20) {
      // 取得相對位置的顏色
      let col = capture.get(x, y);

      // 繪製方框
      overlayGraphics.fill(col);
      overlayGraphics.noStroke();
      overlayGraphics.rect(x + 1, y + 1, 18, 18); // 方框寬高為 18

      // 繪製中間的圓
      overlayGraphics.fill(0); // 圓的顏色為黑色
      overlayGraphics.ellipse(x + 10, y + 10, 5, 5); // 圓的直徑為 5
    }
  }
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  background('#f5ebe0');
}


```
