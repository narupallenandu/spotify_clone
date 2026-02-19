"use client"

import { useState, useCallback } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AppSidebar } from "@/components/app-sidebar"
import { PlayerBar } from "@/components/player-bar"
import { MobileNav } from "@/components/mobile-nav"
import { HomeView } from "@/components/views/home-view"
import { SearchView } from "@/components/views/search-view"
import { AlbumView } from "@/components/views/album-view"
import { PlaylistView } from "@/components/views/playlist-view"
import { LibraryView } from "@/components/views/library-view"
import { LikedView } from "@/components/views/liked-view"

type ViewState =
  | { type: "home" }
  | { type: "search" }
  | { type: "library" }
  | { type: "liked" }
  | { type: "album"; id: string }
  | { type: "playlist"; id: string }

export default function SpotifyApp() {
  const [view, setView] = useState<ViewState>({ type: "home" })
  const [history, setHistory] = useState<ViewState[]>([{ type: "home" }])
  const [historyIndex, setHistoryIndex] = useState(0)

  const navigate = useCallback(
    (viewType: string, id?: string) => {
      let newView: ViewState

      switch (viewType) {
        case "album":
          newView = { type: "album", id: id! }
          break
        case "playlist":
          newView = { type: "playlist", id: id! }
          break
        case "search":
          newView = { type: "search" }
          break
        case "library":
          newView = { type: "library" }
          break
        case "liked":
          newView = { type: "liked" }
          break
        default:
          newView = { type: "home" }
      }

      const newHistory = [...history.slice(0, historyIndex + 1), newView]
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
      setView(newView)
    },
    [history, historyIndex]
  )

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setView(history[newIndex])
    }
  }, [history, historyIndex])

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setView(history[newIndex])
    }
  }, [history, historyIndex])

  const currentViewName =
    view.type === "album"
      ? `album-${view.id}`
      : view.type === "playlist"
        ? `playlist-${view.id}`
        : view.type

  const renderView = () => {
    switch (view.type) {
      case "home":
        return <HomeView onNavigate={navigate} />
      case "search":
        return <SearchView onNavigate={navigate} />
      case "library":
        return <LibraryView onNavigate={navigate} />
      case "liked":
        return <LikedView />
      case "album":
        return <AlbumView albumId={view.id} />
      case "playlist":
        return <PlaylistView playlistId={view.id} />
    }
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <AppSidebar currentView={currentViewName} onNavigate={navigate} />

        {/* Main content */}
        <main className="flex-1 flex flex-col min-h-0 p-0 md:p-2 md:pl-0">
          <div className="flex-1 min-h-0 rounded-none md:rounded-lg bg-background md:bg-card overflow-hidden flex flex-col">
            {/* Top bar with back/forward */}
            <header className="flex items-center gap-3 px-6 py-3 bg-transparent">
              <button
                onClick={goBack}
                disabled={historyIndex <= 0}
                className="flex size-8 items-center justify-center rounded-full bg-background/60 text-foreground transition-colors hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Go back"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.03 3.97a.75.75 0 010 1.06L7.56 8.5l3.47 3.47a.75.75 0 11-1.06 1.06l-4-4a.75.75 0 010-1.06l4-4a.75.75 0 011.06 0z" />
                </svg>
              </button>
              <button
                onClick={goForward}
                disabled={historyIndex >= history.length - 1}
                className="flex size-8 items-center justify-center rounded-full bg-background/60 text-foreground transition-colors hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Go forward"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4.97 3.97a.75.75 0 011.06 0l4 4a.75.75 0 010 1.06l-4 4a.75.75 0 01-1.06-1.06L8.44 8.5 4.97 5.03a.75.75 0 010-1.06z" />
                </svg>
              </button>
            </header>

            {/* Scrollable content */}
            <ScrollArea className="flex-1">
              {renderView()}
            </ScrollArea>
          </div>
        </main>
      </div>

      {/* Player bar */}
      <PlayerBar />

      {/* Mobile nav */}
      <MobileNav currentView={view.type} onNavigate={navigate} />
    </div>
  )
}
