'use client';


export default function Stage({ children }: { children: React.ReactNode }) {
return (
<div className="w-full h-full relative overflow-hidden
bg-gradient-to-b from-purple-900 via-black to-black">
{children}
</div>
);
}