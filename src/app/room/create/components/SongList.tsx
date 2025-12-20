'use client';

type SongListProps = {
  selectedSong: string | null;
  setSelectedSong: (song: string) => void;
};

export default function SongList({ selectedSong, setSelectedSong }: SongListProps) {
  const songs = ['Song A', 'Song B', 'Song C', 'Song D'];

  return (
    <div className="flex flex-col gap-2">
      {songs.map((song) => (
        <button
          key={song}
          onClick={() => setSelectedSong(song)}
          className={`p-2 rounded ${
            selectedSong === song ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {song}
        </button>
      ))}
    </div>
  );
}
