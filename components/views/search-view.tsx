"use client"

import { useState, useMemo } from "react"
import { Search, Play } from "lucide-react"
import { albums, allTracks, genres, formatDuration } from "@/lib/music-data"
import { usePlayerActions, usePlayerStore } from "@/lib/player-store"
import { cn } from "@/lib/utils"

interface SearchViewProps {
  onNavigate: (view: string, id?: string) => void
}

const genreColors: Record<string, string> = {
  Electronic: "from-blue-600 to-blue-900",
  Pop: "from-pink-500 to-pink-800",
  "Hip-Hop": "from-amber-600 to-amber-900",
  Rock: "from-red-600 to-red-900",
  Jazz: "from-indigo-500 to-indigo-800",
  "Lo-Fi": "from-teal-500 to-teal-800",
  Ambient: "from-slate-500 to-slate-800",
  Soul: "from-orange-500 to-orange-800",
  Folk: "from-green-600 to-green-900",
  World: "from-emerald-500 to-emerald-800",
  Synthwave: "from-fuchsia-500 to-fuchsia-800",
}

export function SearchView({ onNavigate }: SearchViewProps) {
  const [query, setQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const actions = usePlayerActions()
  const player = usePlayerStore()

  const filteredTracks = useMemo(() => {
    let results = allTracks
    if (query.trim()) {
      const q = query.toLowerCase()
      results = results.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.artist.toLowerCase().includes(q) ||
          t.album.toLowerCase().includes(q)
      )
    }
    if (selectedGenre !== "All") {
      const genreAlbumIds = albums
        .filter((a) => a.genre === selectedGenre)
        .map((a) => a.id)
      results = results.filter((t) => genreAlbumIds.includes(t.albumId))
    }
    return results
  }, [query, selectedGenre])

  const filteredAlbums = useMemo(() => {
    if (!query.trim() && selectedGenre === "All") return albums
    let results = albums
    if (query.trim()) {
      const q = query.toLowerCase()
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.artist.toLowerCase().includes(q)
      )
    }
    if (selectedGenre !== "All") {
      results = results.filter((a) => a.genre === selectedGenre)
    }
    return results
  }, [query, selectedGenre])

  const showResults = query.trim() || selectedGenre !== "All"

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold text-foreground">Search</h1>

      {/* Search bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to listen to?"
          className="w-full rounded-full bg-secondary py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Genre chips */}
      <div className="flex flex-wrap gap-2">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              selectedGenre === g
                ? "bg-foreground text-background"
                : "bg-secondary text-foreground hover:bg-accent"
            )}
          >
            {g}
          </button>
        ))}
      </div>

      {!showResults ? (
        /* Browse genres */
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Browse All</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {genres
              .filter((g) => g !== "All")
              .map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={cn(
                    "relative h-32 rounded-lg overflow-hidden bg-gradient-to-br p-4 text-left transition-transform hover:scale-[1.02]",
                    genreColors[genre] || "from-gray-600 to-gray-800"
                  )}
                >
                  <span className="text-lg font-bold text-white">{genre}</span>
                </button>
              ))}
          </div>
        </section>
      ) : (
        /* Search results */
        <div className="flex flex-col gap-8">
          {/* Albums */}
          {filteredAlbums.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Albums</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAlbums.map((album) => (
                  <button
                    key={album.id}
                    onClick={() => onNavigate("album", album.id)}
                    className="group flex flex-col gap-3 rounded-lg bg-card p-3 transition-colors hover:bg-accent text-left"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-md">
                      <img
                        src={album.coverUrl}
                        alt={album.title}
                        className="size-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            actions.playAlbumOrPlaylist(album.tracks, 0)
                          }}
                          className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
                          aria-label={`Play ${album.title}`}
                        >
                          <Play className="size-4 fill-current ml-0.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm font-medium text-foreground truncate">{album.title}</span>
                      <span className="text-xs text-muted-foreground truncate">{album.artist}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Tracks */}
          {filteredTracks.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4">Songs</h2>
              <div className="flex flex-col">
                {filteredTracks.slice(0, 15).map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={() => actions.playTrack(track, filteredTracks, idx)}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-accent text-left",
                      player.currentTrack?.id === track.id && "bg-accent"
                    )}
                  >
                    <img
                      src={track.coverUrl}
                      alt={track.album}
                      className="size-10 rounded object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span
                        className={cn(
                          "text-sm font-medium truncate",
                          player.currentTrack?.id === track.id
                            ? "text-primary"
                            : "text-foreground"
                        )}
                      >
                        {track.title}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {track.artist}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {formatDuration(track.duration)}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {filteredAlbums.length === 0 && filteredTracks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-lg font-medium text-foreground">
                {"No results found"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {"Try different keywords or browse genres"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
