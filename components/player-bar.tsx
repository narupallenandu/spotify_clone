"use client"

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Heart,
  Mic2,
  ListMusic,
  Maximize2,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { usePlayerStore, usePlayerActions } from "@/lib/player-store"
import { formatDuration } from "@/lib/music-data"
import { cn } from "@/lib/utils"

export function PlayerBar() {
  const player = usePlayerStore()
  const actions = usePlayerActions()

  if (!player.currentTrack) {
    return (
      <footer className="h-[80px] border-t border-border bg-[var(--player-bar)] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Select a track to start listening</p>
      </footer>
    )
  }

  const track = player.currentTrack

  return (
    <footer className="h-[80px] border-t border-border bg-[var(--player-bar)] flex items-center px-4 gap-4">
      {/* Track info - left */}
      <div className="flex items-center gap-3 w-[240px] flex-shrink-0">
        <img
          src={track.coverUrl}
          alt={track.album}
          className="size-12 rounded object-cover"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-foreground truncate">
            {track.title}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {track.artist}
          </span>
        </div>
        <button
          onClick={() => actions.toggleLike(track.id)}
          className={cn(
            "flex-shrink-0 p-1 transition-colors",
            player.isLiked[track.id]
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={player.isLiked[track.id] ? "Unlike" : "Like"}
        >
          <Heart
            className={cn("size-4", player.isLiked[track.id] && "fill-primary")}
          />
        </button>
      </div>

      {/* Controls - center */}
      <div className="flex flex-col items-center flex-1 max-w-[600px] gap-1">
        <div className="flex items-center gap-3">
          <button
            onClick={actions.toggleShuffle}
            className={cn(
              "p-1 transition-colors",
              player.isShuffle
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Toggle shuffle"
          >
            <Shuffle className="size-4" />
          </button>
          <button
            onClick={actions.previous}
            className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Previous track"
          >
            <SkipBack className="size-4 fill-current" />
          </button>
          <button
            onClick={actions.togglePlay}
            className="flex size-8 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
            aria-label={player.isPlaying ? "Pause" : "Play"}
          >
            {player.isPlaying ? (
              <Pause className="size-4 fill-current" />
            ) : (
              <Play className="size-4 fill-current ml-0.5" />
            )}
          </button>
          <button
            onClick={actions.next}
            className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Next track"
          >
            <SkipForward className="size-4 fill-current" />
          </button>
          <button
            onClick={actions.toggleRepeat}
            className={cn(
              "p-1 transition-colors relative",
              player.repeatMode !== "off"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Toggle repeat"
          >
            {player.repeatMode === "one" ? (
              <Repeat1 className="size-4" />
            ) : (
              <Repeat className="size-4" />
            )}
            {player.repeatMode !== "off" && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-primary" />
            )}
          </button>
        </div>

        {/* Progress */}
        <div className="flex w-full items-center gap-2">
          <span className="text-[11px] text-muted-foreground w-10 text-right tabular-nums">
            {formatDuration(player.currentTime)}
          </span>
          <Slider
            value={[player.progress]}
            max={100}
            step={0.1}
            onValueChange={([val]) => actions.seek(val)}
            className="flex-1 [&_[data-slot=slider-track]]:h-1 [&_[data-slot=slider-thumb]]:size-3 [&_[data-slot=slider-thumb]]:opacity-0 [&:hover_[data-slot=slider-thumb]]:opacity-100 [&_[data-slot=slider-range]]:bg-foreground [&:hover_[data-slot=slider-range]]:bg-primary"
          />
          <span className="text-[11px] text-muted-foreground w-10 tabular-nums">
            {formatDuration(track.duration)}
          </span>
        </div>
      </div>

      {/* Volume - right */}
      <div className="hidden md:flex items-center gap-2 w-[200px] justify-end">
        <button className="p-1 text-muted-foreground hover:text-foreground transition-colors" aria-label="Lyrics">
          <Mic2 className="size-4" />
        </button>
        <button className="p-1 text-muted-foreground hover:text-foreground transition-colors" aria-label="Queue">
          <ListMusic className="size-4" />
        </button>
        <button
          onClick={() => actions.setVolume(player.volume === 0 ? 70 : 0)}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={player.volume === 0 ? "Unmute" : "Mute"}
        >
          {player.volume === 0 ? (
            <VolumeX className="size-4" />
          ) : (
            <Volume2 className="size-4" />
          )}
        </button>
        <Slider
          value={[player.volume]}
          max={100}
          step={1}
          onValueChange={([val]) => actions.setVolume(val)}
          className="w-24 [&_[data-slot=slider-track]]:h-1 [&_[data-slot=slider-thumb]]:size-3 [&_[data-slot=slider-thumb]]:opacity-0 [&:hover_[data-slot=slider-thumb]]:opacity-100 [&_[data-slot=slider-range]]:bg-foreground [&:hover_[data-slot=slider-range]]:bg-primary"
        />
        <button className="p-1 text-muted-foreground hover:text-foreground transition-colors" aria-label="Fullscreen">
          <Maximize2 className="size-3.5" />
        </button>
      </div>
    </footer>
  )
}
