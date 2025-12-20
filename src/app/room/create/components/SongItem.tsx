'use client';

export default function SongItem({ title }: { title: string }) {
  return (
    <div className="p-2 bg-gray-800 text-white rounded-md hover:bg-purple-700 cursor-pointer">
      {title}
    </div>
  );
}
