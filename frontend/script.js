const videoElement = document.getElementById("scanner");
const resultElement = document.getElementById("result");
const startButton = document.getElementById("start-scan");

startButton.addEventListener("click", startScanner);

function startScanner() {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.setAttribute("playsinline", true);
      videoElement.style.display = "block";
      videoElement.play();
      requestAnimationFrame(scanQRCode);
    })
    .catch((err) => {
      console.error("Error accessing the camera: ", err);
      resultElement.innerHTML = `<p style="color: red;">Camera access denied. Please enable permissions.</p>`;
    });
}

function scanQRCode() {
  if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

    if (qrCode) {
      resultElement.textContent = `Product Information: ${qrCode.data}`;
      stopScanner();
      fetchProductInfo(qrCode.data);
    } else {
      requestAnimationFrame(scanQRCode);
    }
  } else {
    requestAnimationFrame(scanQRCode);
  }
}

function stopScanner() {
  const stream = videoElement.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());
  videoElement.srcObject = null;
}

function fetchProductInfo(qrCodeData) {
  resultElement.innerHTML = `<p>Fetching product details...</p>`;
  fetch(`/api/products/${qrCodeData}`)
    .then((response) => {
      if (!response.ok) throw new Error("Product not found");
      return response.json();
    })
    .then((data) => {
      resultElement.innerHTML = `
        <strong>Product Info:</strong>
        <p>Origin: ${data.origin}</p>
        <p>Journey: ${data.journey}</p>
        <p>Authenticity: Verified on the blockchain</p>
      `;
    })
    .catch(() => {
      resultElement.innerHTML = `<p style="color: red;">Error retrieving product info. Try again.</p>`;
    });
}
