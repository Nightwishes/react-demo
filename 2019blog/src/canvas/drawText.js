const HUILIYI = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557164531836&di=07b14527354e6e029e27666dff13cac7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201604%2F03%2F20160403153919_ceaHJ.thumb.700_0.jpeg';
function drawText (canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.font = 'bold 30px Arial';
  let linearGradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  linearGradient.addColorStop(0.2, 'rgb(255, 192, 203)');
  linearGradient.addColorStop(0.6, 'black');
  linearGradient.addColorStop(1.0, 'rgb(177, 17, 22)');
  context.fillStyle = linearGradient;
  context.shadowColor = 'black';
  context.shadowOffsetX = 6;
  context.shadowOffsetY = 6;
  context.shadowBlur = 3;
  context.textAlign = 'left';
  context.textBaseline = 'top';
  context.fillText('~Sakura的博客', 80, 10)
  context.font = 'italic 20px Arial';
  context.fillStyle = 'rgb(0, 0, 0)';
  context.textAlign = 'right';
  context.textBaseline = 'bottom';
  context.fillText('~~~~Sakura', 450, 100);
}
function canvasChange (canvas, context) {
  let image = new Image();
  image.src = HUILIYI;
  image.onload = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
}
export {
  drawText,
  canvasChange
}