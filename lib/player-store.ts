"use client"

import { useSyncExternalStore, useCallback } from "react"
import type { Track } from "./music-data"

interface PlayerState {
  currentTrack: Track | null
  queue: Track[]
  queueIndex: number
  isPlaying: boolean
  progress: number // 0-100
  currentTime: number // seconds
  volume: number // 0-100
  isShuffle: boolean
  repeatMode: "off" | "all" | "one"
  isLiked: Record<string, boolean>
}

let state: PlayerState = {
  currentTrack: null,
  queue: [],
  queueIndex: -1,
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  volume: 70,
  isShuffle: false,
  repeatMode: "off",
  isLiked: {},
}

const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

function setState(update: Partial<PlayerState>) {
  state = { ...state, ...update }
  emit()
}

// HTML5 Audio element for actual playback
let audio: HTMLAudioElement | null = null

// Initialize audio element
if (typeof window !== "undefined") {
  audio = new Audio()

  // Set up event listeners
  audio.addEventListener("timeupdate", () => {
    if (state.currentTrack && audio) {
      const newTime = Math.floor(audio.currentTime)
      const newProgress = (audio.currentTime / state.currentTrack.duration) * 100
      setState({ currentTime: newTime, progress: newProgress })
    }
  })

  audio.addEventListener("ended", () => {
    actions.next()
  })

  audio.addEventListener("loadedmetadata", () => {
    if (audio && state.isPlaying) {
      audio.play().catch((err) => console.error("Playback failed:", err))
    }
  })

  // Set initial volume
  audio.volume = state.volume / 100
}

export const actions = {
  playTrack(track: Track, queue?: Track[], index?: number) {
    setState({
      currentTrack: track,
      queue: queue || [track],
      queueIndex: index ?? 0,
      isPlaying: true,
      progress: 0,
      currentTime: 0,
    })
    if (audio) {
      audio.src = track.audioUrl
      audio.currentTime = 0
      audio.play().catch((err) => console.error("Playback failed:", err))
    }
  },

  playAlbumOrPlaylist(tracks: Track[], startIndex = 0) {
    if (tracks.length === 0) return
    setState({
      currentTrack: tracks[startIndex],
      queue: tracks,
      queueIndex: startIndex,
      isPlaying: true,
      progress: 0,
      currentTime: 0,
    })
    if (audio) {
      audio.src = tracks[startIndex].audioUrl
      audio.currentTime = 0
      audio.play().catch((err) => console.error("Playback failed:", err))
    }
  },

  togglePlay() {
    const newPlaying = !state.isPlaying
    setState({ isPlaying: newPlaying })
    if (audio) {
      if (newPlaying) {
        audio.play().catch((err) => console.error("Playback failed:", err))
      } else {
        audio.pause()
      }
    }
  },

  next() {
    if (state.queue.length === 0) return

    if (state.repeatMode === "one") {
      setState({ progress: 0, currentTime: 0 })
      if (audio) {
        audio.currentTime = 0
        audio.play().catch((err) => console.error("Playback failed:", err))
      }
      return
    }

    let nextIndex = state.queueIndex + 1
    if (state.isShuffle) {
      nextIndex = Math.floor(Math.random() * state.queue.length)
    } else if (nextIndex >= state.queue.length) {
      if (state.repeatMode === "all") {
        nextIndex = 0
      } else {
        setState({ isPlaying: false })
        if (audio) {
          audio.pause()
        }
        return
      }
    }

    setState({
      currentTrack: state.queue[nextIndex],
      queueIndex: nextIndex,
      progress: 0,
      currentTime: 0,
      isPlaying: true,
    })
    if (audio) {
      audio.src = state.queue[nextIndex].audioUrl
      audio.currentTime = 0
      audio.play().catch((err) => console.error("Playback failed:", err))
    }
  },

  previous() {
    if (state.currentTime > 3) {
      setState({ progress: 0, currentTime: 0 })
      if (audio) {
        audio.currentTime = 0
      }
      return
    }
    if (state.queue.length === 0) return
    let prevIndex = state.queueIndex - 1
    if (prevIndex < 0) {
      prevIndex = state.repeatMode === "all" ? state.queue.length - 1 : 0
    }
    setState({
      currentTrack: state.queue[prevIndex],
      queueIndex: prevIndex,
      progress: 0,
      currentTime: 0,
      isPlaying: true,
    })
    if (audio) {
      audio.src = state.queue[prevIndex].audioUrl
      audio.currentTime = 0
      audio.play().catch((err) => console.error("Playback failed:", err))
    }
  },

  seek(percent: number) {
    if (!state.currentTrack) return
    const newTime = (percent / 100) * state.currentTrack.duration
    setState({ progress: percent, currentTime: Math.floor(newTime) })
    if (audio) {
      audio.currentTime = newTime
    }
  },

  setVolume(vol: number) {
    setState({ volume: vol })
    if (audio) {
      audio.volume = vol / 100
    }
  },

  toggleShuffle() {
    setState({ isShuffle: !state.isShuffle })
  },

  toggleRepeat() {
    const modes: Array<"off" | "all" | "one"> = ["off", "all", "one"]
    const idx = modes.indexOf(state.repeatMode)
    setState({ repeatMode: modes[(idx + 1) % 3] })
  },

  toggleLike(trackId: string) {
    setState({
      isLiked: { ...state.isLiked, [trackId]: !state.isLiked[trackId] },
    })
  },
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

function getSnapshot() {
  return state
}

export function usePlayerStore(): PlayerState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export function usePlayerActions() {
  return actions
}
