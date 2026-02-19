"use client"

import { Play, Pause, Heart, Clock } from "lucide-react"
import { allTracks, formatDuration } from "@/lib/music-data"
import { usePlayerStore, usePlayerActions } from "@/lib/player-store"
import { cn } from "@/lib/utils"

export function LikedView() {
  const player = usePlayerStore()
  const actions = usePlayerActions()

  const likedTracks = allTracks.filter((t) => player.isLiked[t.id])

  const isLikedPlaying =
    player.isPlaying &&
    player.currentTrack &&
    likedTracks.some((t) => t.id === player.currentTrack?.id)

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-end gap-6 p-6 pb-8 bg-gradient-to-b from-primary/20 to-background">
        <div className="size-48 lg:size-56 rounded-lg bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center flex-shrink-0 shadow-2xl">
          <Heart className="size-20 text-primary-foreground fill-primary-foreground" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-foreground uppercase tracking-wider">
            Playlist
          </span>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-foreground text-balance leading-tight">
            Liked Songs
          </h1>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>{likedTracks.length} songs</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      {likedTracks.length > 0 && (
        <div className="flex items-center gap-6 px-6 py-4">
          <button
            onClick={() =>
              isLikedPlaying
                ? actions.togglePlay()
                : actions.playAlbumOrPlaylist(likedTracks, 0)
            }
            className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
            aria-label={isLikedPlaying ? "Pause" : "Play"}
          >
            {isLikedPlaying ? (
              <Pause className="size-5 fill-current" />
            ) : (
              <Play className="size-5 fill-current ml-0.5" />
            )}
          </button>
        </div>
      )}

      {/* Track list */}
      <div className="px-6">
        {likedTracks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Heart className="size-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground">
              Songs you like will appear here
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Save songs by tapping the heart icon
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 px-3 py-2 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
              <span className="w-8 text-center">#</span>
              <span className="flex-1">Title</span>
              <span className="hidden sm:block w-40">Album</span>
              <Clock className="size-4" />
            </div>

            {likedTracks.map((track, idx) => {
              const isCurrentTrack = player.currentTrack?.id === track.id
              const isTrackPlaying = isCurrentTrack && player.isPlaying

              return (
                <button
                  key={track.id}
                  onClick={() =>
                    isCurrentTrack
                      ? actions.togglePlay()
                      : actions.playTrack(track, likedTracks, idx)
                  }
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-md px-3 py-2.5 transition-colors hover:bg-accent text-left",
                    isCurrentTrack && "bg-accent/50"
                  )}
                >
                  <span className="w-8 text-center text-sm tabular-nums">
                    {isTrackPlaying ? (
                      <span className="inline-flex gap-0.5 items-end h-3.5">
                        <span className="w-0.5 bg-primary animate-pulse h-2" />
                        <span className="w-0.5 bg-primary animate-pulse h-3 delay-75" />
                        <span className="w-0.5 bg-primary animate-pulse h-1.5 delay-150" />
                      </span>
                    ) : (
                      <span className={cn("group-hover:hidden", isCurrentTrack ? "text-primary" : "text-muted-foreground")}>
                        {idx + 1}
                      </span>
                    )}
                    {!isTrackPlaying && (
                      <Play className="size-3.5 hidden group-hover:inline fill-current text-foreground" />
                    )}
                  </span>

                  <img
                    src={track.coverUrl}
                    alt={track.album}
                    className="size-9 rounded object-cover flex-shrink-0"
                  />

                  <div className="flex flex-col flex-1 min-w-0">
                    <span className={cn("text-sm font-medium truncate", isCurrentTrack ? "text-primary" : "text-foreground")}>
                      {track.title}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {track.artist}
                    </span>
                  </div>

                  <span className="hidden sm:block w-40 text-xs text-muted-foreground truncate">
                    {track.album}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      actions.toggleLike(track.id)
                    }}
                    className="p-1 text-primary"
                    aria-label="Unlike"
                  >
                    <Heart className="size-3.5 fill-primary text-primary" />
                  </button>

                  <span className="text-xs text-muted-foreground tabular-nums">
                    {formatDuration(track.duration)}
                  </span>
                </button>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
