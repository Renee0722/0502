20250502上課筆記
---
## 第一條指令
產生全螢幕的畫布，背景顏色為f5ebe0
擷取攝影機的影像，正常顯示在視窗的中間
影像畫面為視窗大小的80%
請把程式碼寫在sketch.js內

說明：
1. createCanvas(windowWidth, windowHeight)：建立全螢幕畫布。
1. background('#f5ebe0')：設定背景顏色為 #f5ebe0。
1. createCapture(VIDEO)：啟用攝影機並擷取影像。
1. capture.size(windowWidth * 0.8, windowHeight * 0.8)：將影像大小設為視窗的 80%。
1. image(capture, x, y)：將影像繪製在畫布上，並置中顯示。
1. windowResized：當視窗大小改變時，重新調整畫布大小並保持背景一致。

---
