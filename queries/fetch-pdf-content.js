const PDFExtract = require("pdf.js-extract").PDFExtract;
const pdfExtract = new PDFExtract();

exports.fetchPdfContent = async function (url) {
  const { data } = await this.http.get(url, {
    responseType: "arraybuffer",
  });
  const extracted = await pdfExtract.extractBuffer(Buffer.from(data, "binary"));
  return extracted?.pages[0]?.content || [];
};
