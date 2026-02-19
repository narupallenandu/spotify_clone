"use client"

import { Home, Search, Library } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  currentView: string
  onNavigate: (view: string) => void
}

export function MobileNav({ currentView, onNavigate }: MobileNavProps) {
  const items = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "library", label: "Your Library", icon: Library },
  ]

  return (
    <nav className="flex md:hidden items-center justify-around border-t border-border bg-[var(--player-bar)] px-2 py-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={cn(
            "flex flex-col items-center gap-0.5 px-4 py-1 text-[10px] font-medium transition-colors",
            currentView === item.id
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          <item.icon className="size-5" />
          {item.label}
        </button>
      ))}
    </nav>
  )
}
