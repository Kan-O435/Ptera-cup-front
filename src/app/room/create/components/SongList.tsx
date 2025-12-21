'use client';

type SongListProps = {
  selectedSong: string | null;
  setSelectedSong: (song: string) => void;
  searchTerm: string;
};

export default function SongList({ selectedSong, setSelectedSong, searchTerm }: SongListProps) {
  // 曲リスト（実際のファイル名に合わせる）
  const songs = [
    { id: 'kimocall', title: 'Kimo Call', artist: '', duration: '3:45' },
    { id: 'live-bgm', title: 'Live BGM', artist: '', duration: '5:20' },
    { id: 'demo', title: 'Demo', artist: '', duration: '1:20' },
  ];

  // 検索フィルター
  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (songId: string) => {
    setSelectedSong(songId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredSongs.length > 0 ? (
        filteredSongs.map((song) => (
          <div
            key={song.id}
            onClick={() => handleSelect(song.id)}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg ${
              selectedSong === song.id
                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white ring-2 ring-white/50'
                : 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/50 backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                selectedSong === song.id ? 'bg-white/20' : 'bg-purple-500/50'
              }`}>
                🎵
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{song.title}</h3>
                <p className="text-sm opacity-75">{song.artist}</p>
                <p className="text-xs opacity-50">{song.duration}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-gray-400">
          該当する楽曲が見つかりません
        </div>
      )}
    </div>
  );
}
