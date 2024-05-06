import React, { useEffect, useState } from "react";
import axios from "axios";

function QRCode({ link }: { link: string }) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    const downloadQRCode = async () => {
      const response = await axios.get(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}`,
        {
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);

      setQrCodeUrl(url);
    };
    downloadQRCode();
  }, [link]);

  return (
    <div className="flex justify-center items-center">
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}`}
        alt="QR Code"
      />
      {qrCodeUrl && (
        <a
          href={qrCodeUrl}
          download="qr-code.png"
          className="ml-4 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Download
        </a>
      )}
      {/* <button
        className="ml-4 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500"
        onClick={() => {
          console.log("clicked");
          navigator.share({ url: link });
        }}
      >
        Share
      </button> */}
    </div>
  );
}

export default QRCode;
