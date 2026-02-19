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

// Timer for progress simulation
let progressInterval: ReturnType<typeof setInterval> | null = null

function startProgressTimer() {
  stopProgressTimer()
  progressInterval = setInterval(() => {
    if (state.currentTrack && state.isPlaying) {
      const newTime = state.currentTime + 1
      if (newTime >= state.currentTrack.duration) {
        // Track ended
        actions.next()
      } else {
        const newProgress = (newTime / state.currentTrack.duration) * 100
        setState({ currentTime: newTime, progress: newProgress })
      }
    }
  }, 1000)
}

function stopProgressTimer() {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
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
    startProgressTimer()
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
    startProgressTimer()
  },

  togglePlay() {
    const newPlaying = !state.isPlaying
    setState({ isPlaying: newPlaying })
    if (newPlaying) {
      startProgressTimer()
    } else {
      stopProgressTimer()
    }
  },

  next() {
    if (state.queue.length === 0) return

    if (state.repeatMode === "one") {
      setState({ progress: 0, currentTime: 0 })
      startProgressTimer()
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
        stopProgressTimer()
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
    startProgressTimer()
  },

  previous() {
    if (state.currentTime > 3) {
      setState({ progress: 0, currentTime: 0 })
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
    startProgressTimer()
  },

  seek(percent: number) {
    if (!state.currentTrack) return
    const newTime = Math.floor((percent / 100) * state.currentTrack.duration)
    setState({ progress: percent, currentTime: newTime })
  },

  setVolume(vol: number) {
    setState({ volume: vol })
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
