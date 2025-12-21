'use client';

type SongListProps = {
  selectedSong: string | null;
  setSelectedSong: (song: string) => void;
};

export default function SongList({ selectedSong, setSelectedSong }: SongListProps) {
  // 曲リスト（重複ありでもOK）
  const songs = ['kimocall', 'livebgm', 'test1', 'test2', 'kimocall'];

  const handleSelect = (song: string) => {
    setSelectedSong(song); // 曲名単位で選択
  };

  return (
    <div className="flex flex-col gap-2">
      {songs.map((song, index) => (
        <button
          key={index} // 重複してもOK
          onClick={() => handleSelect(song)}
          className={`p-2 rounded text-black text-left ${
            selectedSong === song ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {song}
        </button>
      ))}
    </div>
  );
}
