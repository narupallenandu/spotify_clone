"use client"

import { Play } from "lucide-react"
import { albums, playlists } from "@/lib/music-data"
import { usePlayerActions } from "@/lib/player-store"

interface LibraryViewProps {
  onNavigate: (view: string, id?: string) => void
}

export function LibraryView({ onNavigate }: LibraryViewProps) {
  const actions = usePlayerActions()

  return (
    <div className="flex flex-col gap-8 p-6">
      <h1 className="text-3xl font-bold text-foreground">Your Library</h1>

      {/* Playlists */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {playlists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => onNavigate("playlist", pl.id)}
              className="group flex flex-col gap-3 rounded-lg bg-card p-3 transition-colors hover:bg-accent text-left"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-md">
                <img
                  src={pl.coverUrl}
                  alt={pl.name}
                  className="size-full object-cover"
                />
                <div className="absolute bottom-2 right-2 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      actions.playAlbumOrPlaylist(pl.tracks, 0)
                    }}
                    className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
                    aria-label={`Play ${pl.name}`}
                  >
                    <Play className="size-4 fill-current ml-0.5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium text-foreground truncate">{pl.name}</span>
                <span className="text-xs text-muted-foreground truncate">{pl.description}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* All Albums */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Albums</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {albums.map((album) => (
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
    </div>
  )
}
