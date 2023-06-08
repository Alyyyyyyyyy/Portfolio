// 透過 pdf.js 渲染 pdf 檔在頁面上 (開始)
// 獲取 PDF 文件的 URL
const pdfUrl = "file/resume.pdf";

// 獲取容器元素
const container = document.getElementById("pdf-container");

// 加載 PDF 文件
pdfjsLib.getDocument(pdfUrl).promise.then((pdf) => {
  // 定義遞迴來抓頁數
  function renderPage(pageNumber) {
    pdf.getPage(pageNumber).then((page) => {
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // create Canvas 元素
      const canvas = document.createElement("canvas");
      canvas.className = "pdf-page";
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // 渲染頁面
      page
        .render({
          canvasContext: context,
          viewport,
        })
        .promise.then(() => {
          // 將 Canvas 元素添加到容器
          container.appendChild(canvas);

          // 處理下一页
          if (pageNumber < pdf.numPages) {
            renderPage(pageNumber + 1);
          }
        });
    });
  }

  // 從第一頁開始遞歸處理
  renderPage(1);
});
// 透過 pdf.js 渲染 pdf 檔在頁面上 (結束)
