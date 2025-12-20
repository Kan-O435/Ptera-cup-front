'use client';

export default function RoomQRCode({ roomId }: { roomId: string }) {
  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/room/${roomId}/join`
      : '';

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="absolute top-4 right-4 bg-white p-2 rounded">
      <img src={qrUrl} alt="QR Code" />
      <p className="text-black text-xs text-center mt-1">
        Scan to Join
      </p>
    </div>
  );
}
