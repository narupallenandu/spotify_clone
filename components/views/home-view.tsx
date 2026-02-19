"use client"

import { Play, Clock } from "lucide-react"
import { albums, playlists } from "@/lib/music-data"
import { usePlayerActions } from "@/lib/player-store"

interface HomeViewProps {
  onNavigate: (view: string, id?: string) => void
}

function AlbumCard({
  title,
  subtitle,
  coverUrl,
  onClick,
  onPlay,
}: {
  title: string
  subtitle: string
  coverUrl: string
  onClick: () => void
  onPlay: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col gap-3 rounded-lg bg-card p-3 transition-colors hover:bg-accent text-left cursor-pointer"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <img
          src={coverUrl}
          alt={title}
          className="size-full object-cover"
        />
        <div className="absolute bottom-2 right-2 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPlay()
            }}
            className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
            aria-label={`Play ${title}`}
          >
            <Play className="size-4 fill-current ml-0.5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-medium text-foreground truncate">
          {title}
        </span>
        <span className="text-xs text-muted-foreground truncate">
          {subtitle}
        </span>
      </div>
    </button>
  )
}

function QuickPlayCard({
  title,
  coverUrl,
  onPlay,
}: {
  title: string
  coverUrl: string
  onPlay: () => void
}) {
  return (
    <button
      onClick={onPlay}
      className="group flex items-center gap-3 rounded-md bg-secondary/60 overflow-hidden hover:bg-secondary transition-colors"
    >
      <img
        src={coverUrl}
        alt={title}
        className="size-12 object-cover flex-shrink-0"
      />
      <span className="text-sm font-semibold text-foreground truncate pr-2">
        {title}
      </span>
      <div className="ml-auto pr-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Play className="size-3.5 fill-current ml-0.5" />
        </div>
      </div>
    </button>
  )
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const actions = usePlayerActions()

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const recentAlbums = albums.slice(0, 6)
  const featuredAlbums = albums.slice(2, 8)
  const newReleases = albums.filter((a) => a.year === 2025)
  const madeForYou = playlists.slice(0, 6)

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-foreground text-balance">
        Narupalle Siva Nandini
      </h1>

      {/* Quick play grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {recentAlbums.map((album) => (
          <QuickPlayCard
            key={album.id}
            title={album.title}
            coverUrl={album.coverUrl}
            onPlay={() =>
              actions.playAlbumOrPlaylist(album.tracks, 0)
            }
          />
        ))}
      </div>

      {/* Made for you */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Made For You</h2>
          <button
            onClick={() => onNavigate("library")}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {madeForYou.map((pl) => (
            <AlbumCard
              key={pl.id}
              title={pl.name}
              subtitle={pl.description}
              coverUrl={pl.coverUrl}
              onClick={() => onNavigate("playlist", pl.id)}
              onPlay={() =>
                actions.playAlbumOrPlaylist(pl.tracks, 0)
              }
            />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Popular Albums</h2>
          <button
            onClick={() => onNavigate("library")}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {featuredAlbums.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              subtitle={album.artist}
              coverUrl={album.coverUrl}
              onClick={() => onNavigate("album", album.id)}
              onPlay={() =>
                actions.playAlbumOrPlaylist(album.tracks, 0)
              }
            />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">New Releases</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {newReleases.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              subtitle={album.artist}
              coverUrl={album.coverUrl}
              onClick={() => onNavigate("album", album.id)}
              onPlay={() =>
                actions.playAlbumOrPlaylist(album.tracks, 0)
              }
            />
          ))}
        </div>
      </section>
    </div>
  )
}
