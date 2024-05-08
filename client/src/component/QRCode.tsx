import { useRef } from "react";
import QRCode from "qrcode.react";
import { toPng } from "html-to-image";

function QRCodeComponent({ link }: { link: string }) {
  const qrCodeRef = useRef(null);

  const downloadQRCode = async () => {
    if (!qrCodeRef.current) return;

    const pngUrl = await toPng(qrCodeRef.current);

    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex items-center">
      <div ref={qrCodeRef} className="bg-white p-1">
        <QRCode value={link} size={100} />
      </div>
      <button
        onClick={downloadQRCode}
        className="ml-4 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500"
      >
        Download QR
      </button>
    </div>
  );
}

export default QRCodeComponent;
