'use client';


export default function Audience() {
return (
<div className="absolute bottom-0 left-0 w-full h-24
bg-black/60 flex justify-center items-end gap-2">
{Array.from({ length: 20 }).map((_, i) => (
<div
key={i}
className="w-3 h-6 bg-gray-700 rounded-t-full"
/>
))}
</div>
);
}