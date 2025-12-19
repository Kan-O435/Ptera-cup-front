import { useEffect, useRef } from 'react';
import Stage from './Stage';
import Idol from './Idol';
import Audience from './Audience';
import Penlights from './Penlights';


export default function StagePage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);


useEffect(() => {
  audioRef.current?.play().catch(() => {});
}, []);


return (
  <div className="w-screen h-screen bg-black text-white">
    <Stage>
    <Idol />
    <Audience />
    <Penlights />
    </Stage>


<audio ref={audioRef} src="/music/demo.mp3" loop />
</div>
);
}