'use client';


export default function Penlights() {
return (
<div className="absolute bottom-0 left-0 w-full h-32
flex justify-center items-end gap-4">
{Array.from({ length: 10 }).map((_, i) => (
<div
key={i}
className="w-3 h-20 bg-green-400 rounded-full
animate-pulse
shadow-[0_0_20px_rgba(0,255,150,0.8)]"
/>
))}
</div>
);
}