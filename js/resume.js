// 获取 PDF 文件的 URL
const pdfUrl = "file/resume.pdf";

// 获取容器元素
const container = document.getElementById("pdf-container");

// 加载 PDF 文件
pdfjsLib.getDocument(pdfUrl).promise.then((pdf) => {
  // 定义递归函数来处理每一页
  function renderPage(pageNumber) {
    pdf.getPage(pageNumber).then((page) => {
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // 创建 Canvas 元素
      const canvas = document.createElement("canvas");
      canvas.className = "pdf-page";
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // 渲染页面
      page
        .render({
          canvasContext: context,
          viewport,
        })
        .promise.then(() => {
          // 将 Canvas 元素添加到页面容器
          container.appendChild(canvas);

          // 递归处理下一页
          if (pageNumber < pdf.numPages) {
            renderPage(pageNumber + 1);
          }
        });
    });
  }

  // 从第一页开始递归处理
  renderPage(1);
});
