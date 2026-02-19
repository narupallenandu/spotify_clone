"use client"

import { Home, Search, Library, Plus, Heart, Music2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { playlists } from "@/lib/music-data"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  currentView: string
  onNavigate: (view: string, id?: string) => void
}

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
  return (
    <aside className="hidden md:flex w-[280px] flex-col flex-shrink-0 gap-2 p-2">
      {/* Main nav */}
      <nav className="rounded-lg bg-card p-4">
        <ul className="flex flex-col gap-1">
          <li>
            <button
              onClick={() => onNavigate("home")}
              className={cn(
                "flex w-full items-center gap-4 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:text-foreground",
                currentView === "home"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Home className="size-5" />
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => onNavigate("search")}
              className={cn(
                "flex w-full items-center gap-4 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:text-foreground",
                currentView === "search"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Search className="size-5" />
              Search
            </button>
          </li>
        </ul>
      </nav>

      {/* Library */}
      <div className="flex-1 rounded-lg bg-card flex flex-col min-h-0">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button
            onClick={() => onNavigate("library")}
            className={cn(
              "flex items-center gap-3 text-sm font-semibold transition-colors hover:text-foreground",
              currentView === "library"
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            <Library className="size-5" />
            Your Library
          </button>
          <button className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent">
            <Plus className="size-4" />
          </button>
        </div>

        <ScrollArea className="flex-1 px-2 pb-2">
          <div className="flex flex-col gap-0.5 py-2">
            {/* Liked songs */}
            <button
              onClick={() => onNavigate("liked")}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent group",
                currentView === "liked" && "bg-accent"
              )}
            >
              <div className="size-10 rounded-sm bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center flex-shrink-0">
                <Heart className="size-4 text-primary-foreground fill-primary-foreground" />
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-medium text-foreground truncate w-full text-left">
                  Liked Songs
                </span>
                <span className="text-xs text-muted-foreground">Playlist</span>
              </div>
            </button>

            {/* Playlists */}
            {playlists.map((pl) => (
              <button
                key={pl.id}
                onClick={() => onNavigate("playlist", pl.id)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent group",
                  currentView === `playlist-${pl.id}` && "bg-accent"
                )}
              >
                <img
                  src={pl.coverUrl}
                  alt={pl.name}
                  className="size-10 rounded-sm object-cover flex-shrink-0"
                />
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-sm font-medium text-foreground truncate w-full text-left">
                    {pl.name}
                  </span>
                  <span className="text-xs text-muted-foreground truncate w-full text-left">
                    Playlist
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
