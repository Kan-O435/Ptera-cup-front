'use client';
import { useSearchParams } from 'next/navigation';
import PenlightRoom from '@/components/PenlightRoom';

export default function Page() {
  const params = useSearchParams();
  const roomId = params.get('roomId')!;
  const deviceId = params.get('deviceId')!;
  const nickname = params.get('nickname')!;

  return <PenlightRoom roomId={roomId} deviceId={deviceId} nickname={nickname} />;
}
