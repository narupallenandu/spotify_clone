export interface Track {
  id: string
  title: string
  artist: string
  album: string
  albumId: string
  duration: number // seconds
  coverUrl: string
}

export interface Album {
  id: string
  title: string
  artist: string
  coverUrl: string
  year: number
  tracks: Track[]
  genre: string
}

export interface Playlist {
  id: string
  name: string
  description: string
  coverUrl: string
  tracks: Track[]
}

export const albums: Album[] = [
  {
    id: "album-1",
    title: "Neon Horizons",
    artist: "Synthwave Collective",
    coverUrl: "/images/album-1.jpg",
    year: 2025,
    genre: "Electronic",
    tracks: [
      { id: "t1", title: "Digital Sunrise", artist: "Synthwave Collective", album: "Neon Horizons", albumId: "album-1", duration: 234, coverUrl: "/images/album-1.jpg" },
      { id: "t2", title: "Pulse of the City", artist: "Synthwave Collective", album: "Neon Horizons", albumId: "album-1", duration: 198, coverUrl: "/images/album-1.jpg" },
      { id: "t3", title: "Midnight Drive", artist: "Synthwave Collective", album: "Neon Horizons", albumId: "album-1", duration: 267, coverUrl: "/images/album-1.jpg" },
      { id: "t4", title: "Electric Dreams", artist: "Synthwave Collective", album: "Neon Horizons", albumId: "album-1", duration: 312, coverUrl: "/images/album-1.jpg" },
      { id: "t5", title: "Starlight Run", artist: "Synthwave Collective", album: "Neon Horizons", albumId: "album-1", duration: 245, coverUrl: "/images/album-1.jpg" },
    ],
  },
  {
    id: "album-2",
    title: "Golden Hour",
    artist: "Marina Sol",
    coverUrl: "/images/album-2.jpg",
    year: 2024,
    genre: "Indie Pop",
    tracks: [
      { id: "t6", title: "Sunset Boulevard", artist: "Marina Sol", album: "Golden Hour", albumId: "album-2", duration: 210, coverUrl: "/images/album-2.jpg" },
      { id: "t7", title: "Ocean Breeze", artist: "Marina Sol", album: "Golden Hour", albumId: "album-2", duration: 185, coverUrl: "/images/album-2.jpg" },
      { id: "t8", title: "Warm Glow", artist: "Marina Sol", album: "Golden Hour", albumId: "album-2", duration: 256, coverUrl: "/images/album-2.jpg" },
      { id: "t9", title: "Amber Light", artist: "Marina Sol", album: "Golden Hour", albumId: "album-2", duration: 224, coverUrl: "/images/album-2.jpg" },
      { id: "t10", title: "Dusk Serenade", artist: "Marina Sol", album: "Golden Hour", albumId: "album-2", duration: 290, coverUrl: "/images/album-2.jpg" },
    ],
  },
  {
    id: "album-3",
    title: "City Lights",
    artist: "Urban Echo",
    coverUrl: "/images/album-3.jpg",
    year: 2025,
    genre: "Hip-Hop",
    tracks: [
      { id: "t11", title: "Neon Streets", artist: "Urban Echo", album: "City Lights", albumId: "album-3", duration: 203, coverUrl: "/images/album-3.jpg" },
      { id: "t12", title: "Rain Dance", artist: "Urban Echo", album: "City Lights", albumId: "album-3", duration: 178, coverUrl: "/images/album-3.jpg" },
      { id: "t13", title: "Skyline Flow", artist: "Urban Echo", album: "City Lights", albumId: "album-3", duration: 241, coverUrl: "/images/album-3.jpg" },
      { id: "t14", title: "Late Night Drive", artist: "Urban Echo", album: "City Lights", albumId: "album-3", duration: 195, coverUrl: "/images/album-3.jpg" },
      { id: "t15", title: "Echo Chamber", artist: "Urban Echo", album: "City Lights", albumId: "album-3", duration: 220, coverUrl: "/images/album-3.jpg" },
    ],
  },
  {
    id: "album-4",
    title: "Cloud Atlas",
    artist: "Daydream Society",
    coverUrl: "/images/album-4.jpg",
    year: 2024,
    genre: "Lo-Fi",
    tracks: [
      { id: "t16", title: "Floating Away", artist: "Daydream Society", album: "Cloud Atlas", albumId: "album-4", duration: 188, coverUrl: "/images/album-4.jpg" },
      { id: "t17", title: "Cotton Clouds", artist: "Daydream Society", album: "Cloud Atlas", albumId: "album-4", duration: 215, coverUrl: "/images/album-4.jpg" },
      { id: "t18", title: "Gentle Rain", artist: "Daydream Society", album: "Cloud Atlas", albumId: "album-4", duration: 242, coverUrl: "/images/album-4.jpg" },
      { id: "t19", title: "Pastel Sky", artist: "Daydream Society", album: "Cloud Atlas", albumId: "album-4", duration: 167, coverUrl: "/images/album-4.jpg" },
      { id: "t20", title: "Dream Sequence", artist: "Daydream Society", album: "Cloud Atlas", albumId: "album-4", duration: 278, coverUrl: "/images/album-4.jpg" },
    ],
  },
  {
    id: "album-5",
    title: "Shatter",
    artist: "Red Axis",
    coverUrl: "/images/album-5.jpg",
    year: 2025,
    genre: "Rock",
    tracks: [
      { id: "t21", title: "Breaking Point", artist: "Red Axis", album: "Shatter", albumId: "album-5", duration: 256, coverUrl: "/images/album-5.jpg" },
      { id: "t22", title: "Edge of Chaos", artist: "Red Axis", album: "Shatter", albumId: "album-5", duration: 312, coverUrl: "/images/album-5.jpg" },
      { id: "t23", title: "Firestorm", artist: "Red Axis", album: "Shatter", albumId: "album-5", duration: 198, coverUrl: "/images/album-5.jpg" },
      { id: "t24", title: "Dark Matter", artist: "Red Axis", album: "Shatter", albumId: "album-5", duration: 275, coverUrl: "/images/album-5.jpg" },
      { id: "t25", title: "Aftershock", artist: "Red Axis", album: "Shatter", albumId: "album-5", duration: 340, coverUrl: "/images/album-5.jpg" },
    ],
  },
  {
    id: "album-6",
    title: "Canopy",
    artist: "Verdant",
    coverUrl: "/images/album-6.jpg",
    year: 2024,
    genre: "World",
    tracks: [
      { id: "t26", title: "Rainforest Dawn", artist: "Verdant", album: "Canopy", albumId: "album-6", duration: 302, coverUrl: "/images/album-6.jpg" },
      { id: "t27", title: "River Song", artist: "Verdant", album: "Canopy", albumId: "album-6", duration: 228, coverUrl: "/images/album-6.jpg" },
      { id: "t28", title: "Jungle Pulse", artist: "Verdant", album: "Canopy", albumId: "album-6", duration: 195, coverUrl: "/images/album-6.jpg" },
      { id: "t29", title: "Golden Canopy", artist: "Verdant", album: "Canopy", albumId: "album-6", duration: 267, coverUrl: "/images/album-6.jpg" },
      { id: "t30", title: "Ancient Roots", artist: "Verdant", album: "Canopy", albumId: "album-6", duration: 345, coverUrl: "/images/album-6.jpg" },
    ],
  },
  {
    id: "album-7",
    title: "Analog Days",
    artist: "Soul Vinyl",
    coverUrl: "/images/album-7.jpg",
    year: 2023,
    genre: "Soul",
    tracks: [
      { id: "t31", title: "Groove Machine", artist: "Soul Vinyl", album: "Analog Days", albumId: "album-7", duration: 234, coverUrl: "/images/album-7.jpg" },
      { id: "t32", title: "Funky Feeling", artist: "Soul Vinyl", album: "Analog Days", albumId: "album-7", duration: 289, coverUrl: "/images/album-7.jpg" },
      { id: "t33", title: "Retro Love", artist: "Soul Vinyl", album: "Analog Days", albumId: "album-7", duration: 198, coverUrl: "/images/album-7.jpg" },
      { id: "t34", title: "Warm Tape", artist: "Soul Vinyl", album: "Analog Days", albumId: "album-7", duration: 212, coverUrl: "/images/album-7.jpg" },
      { id: "t35", title: "Vinyl Sunset", artist: "Soul Vinyl", album: "Analog Days", albumId: "album-7", duration: 256, coverUrl: "/images/album-7.jpg" },
    ],
  },
  {
    id: "album-8",
    title: "Neon Grid",
    artist: "CyberPulse",
    coverUrl: "/images/album-8.jpg",
    year: 2025,
    genre: "Synthwave",
    tracks: [
      { id: "t36", title: "Digital Frontier", artist: "CyberPulse", album: "Neon Grid", albumId: "album-8", duration: 267, coverUrl: "/images/album-8.jpg" },
      { id: "t37", title: "Cyber Chase", artist: "CyberPulse", album: "Neon Grid", albumId: "album-8", duration: 198, coverUrl: "/images/album-8.jpg" },
      { id: "t38", title: "Neural Network", artist: "CyberPulse", album: "Neon Grid", albumId: "album-8", duration: 345, coverUrl: "/images/album-8.jpg" },
      { id: "t39", title: "Hologram", artist: "CyberPulse", album: "Neon Grid", albumId: "album-8", duration: 223, coverUrl: "/images/album-8.jpg" },
      { id: "t40", title: "Grid Runner", artist: "CyberPulse", album: "Neon Grid", albumId: "album-8", duration: 289, coverUrl: "/images/album-8.jpg" },
    ],
  },
  {
    id: "album-9",
    title: "Bloom",
    artist: "Midnight Jazz",
    coverUrl: "/images/album-9.jpg",
    year: 2024,
    genre: "Jazz",
    tracks: [
      { id: "t41", title: "Blue Petals", artist: "Midnight Jazz", album: "Bloom", albumId: "album-9", duration: 356, coverUrl: "/images/album-9.jpg" },
      { id: "t42", title: "Moonlit Garden", artist: "Midnight Jazz", album: "Bloom", albumId: "album-9", duration: 412, coverUrl: "/images/album-9.jpg" },
      { id: "t43", title: "Silent Bloom", artist: "Midnight Jazz", album: "Bloom", albumId: "album-9", duration: 278, coverUrl: "/images/album-9.jpg" },
      { id: "t44", title: "Nocturne", artist: "Midnight Jazz", album: "Bloom", albumId: "album-9", duration: 345, coverUrl: "/images/album-9.jpg" },
      { id: "t45", title: "Last Petal", artist: "Midnight Jazz", album: "Bloom", albumId: "album-9", duration: 289, coverUrl: "/images/album-9.jpg" },
    ],
  },
  {
    id: "album-10",
    title: "Summit",
    artist: "Altitude",
    coverUrl: "/images/album-10.jpg",
    year: 2025,
    genre: "Ambient",
    tracks: [
      { id: "t46", title: "Base Camp", artist: "Altitude", album: "Summit", albumId: "album-10", duration: 423, coverUrl: "/images/album-10.jpg" },
      { id: "t47", title: "Frozen Ascent", artist: "Altitude", album: "Summit", albumId: "album-10", duration: 367, coverUrl: "/images/album-10.jpg" },
      { id: "t48", title: "Starfield", artist: "Altitude", album: "Summit", albumId: "album-10", duration: 298, coverUrl: "/images/album-10.jpg" },
      { id: "t49", title: "Peak", artist: "Altitude", album: "Summit", albumId: "album-10", duration: 456, coverUrl: "/images/album-10.jpg" },
      { id: "t50", title: "Descent", artist: "Altitude", album: "Summit", albumId: "album-10", duration: 334, coverUrl: "/images/album-10.jpg" },
    ],
  },
  {
    id: "album-11",
    title: "Sunshine Pop",
    artist: "Fizzy Hearts",
    coverUrl: "/images/album-11.jpg",
    year: 2025,
    genre: "Pop",
    tracks: [
      { id: "t51", title: "Bubblegum", artist: "Fizzy Hearts", album: "Sunshine Pop", albumId: "album-11", duration: 189, coverUrl: "/images/album-11.jpg" },
      { id: "t52", title: "Sugar Rush", artist: "Fizzy Hearts", album: "Sunshine Pop", albumId: "album-11", duration: 204, coverUrl: "/images/album-11.jpg" },
      { id: "t53", title: "Neon Crush", artist: "Fizzy Hearts", album: "Sunshine Pop", albumId: "album-11", duration: 178, coverUrl: "/images/album-11.jpg" },
      { id: "t54", title: "Electric Kiss", artist: "Fizzy Hearts", album: "Sunshine Pop", albumId: "album-11", duration: 212, coverUrl: "/images/album-11.jpg" },
      { id: "t55", title: "Sparkle", artist: "Fizzy Hearts", album: "Sunshine Pop", albumId: "album-11", duration: 195, coverUrl: "/images/album-11.jpg" },
    ],
  },
  {
    id: "album-12",
    title: "Whisper Woods",
    artist: "Forest Hymns",
    coverUrl: "/images/album-12.jpg",
    year: 2024,
    genre: "Folk",
    tracks: [
      { id: "t56", title: "Morning Fog", artist: "Forest Hymns", album: "Whisper Woods", albumId: "album-12", duration: 278, coverUrl: "/images/album-12.jpg" },
      { id: "t57", title: "Moss Path", artist: "Forest Hymns", album: "Whisper Woods", albumId: "album-12", duration: 245, coverUrl: "/images/album-12.jpg" },
      { id: "t58", title: "Hollow Tree", artist: "Forest Hymns", album: "Whisper Woods", albumId: "album-12", duration: 312, coverUrl: "/images/album-12.jpg" },
      { id: "t59", title: "Fern Valley", artist: "Forest Hymns", album: "Whisper Woods", albumId: "album-12", duration: 198, coverUrl: "/images/album-12.jpg" },
      { id: "t60", title: "Twilight Trail", artist: "Forest Hymns", album: "Whisper Woods", albumId: "album-12", duration: 267, coverUrl: "/images/album-12.jpg" },
    ],
  },
]

export const playlists: Playlist[] = [
  {
    id: "pl-1",
    name: "Today's Hits",
    description: "The biggest songs right now",
    coverUrl: "/images/album-11.jpg",
    tracks: [albums[0].tracks[0], albums[1].tracks[1], albums[2].tracks[0], albums[4].tracks[2], albums[10].tracks[0], albums[7].tracks[1]],
  },
  {
    id: "pl-2",
    name: "Chill Vibes",
    description: "Kick back and relax with these smooth tracks",
    coverUrl: "/images/album-4.jpg",
    tracks: [albums[3].tracks[0], albums[3].tracks[2], albums[8].tracks[0], albums[5].tracks[1], albums[11].tracks[0], albums[9].tracks[2]],
  },
  {
    id: "pl-3",
    name: "Late Night Drives",
    description: "Perfect playlist for cruising at night",
    coverUrl: "/images/album-3.jpg",
    tracks: [albums[0].tracks[2], albums[7].tracks[0], albums[2].tracks[3], albums[6].tracks[4], albums[1].tracks[4], albums[4].tracks[3]],
  },
  {
    id: "pl-4",
    name: "Workout Energy",
    description: "High energy tracks to power your workout",
    coverUrl: "/images/album-5.jpg",
    tracks: [albums[4].tracks[0], albums[2].tracks[2], albums[7].tracks[2], albums[0].tracks[3], albums[10].tracks[1], albums[4].tracks[1]],
  },
  {
    id: "pl-5",
    name: "Jazz & Blues",
    description: "Smooth jazz and soulful blues for any mood",
    coverUrl: "/images/album-9.jpg",
    tracks: [albums[8].tracks[0], albums[8].tracks[1], albums[6].tracks[0], albums[8].tracks[3], albums[6].tracks[2], albums[5].tracks[4]],
  },
  {
    id: "pl-6",
    name: "Nature Sounds",
    description: "Organic soundscapes and acoustic beauty",
    coverUrl: "/images/album-6.jpg",
    tracks: [albums[5].tracks[0], albums[11].tracks[1], albums[9].tracks[0], albums[5].tracks[3], albums[11].tracks[4], albums[9].tracks[4]],
  },
]

export const allTracks: Track[] = albums.flatMap((a) => a.tracks)

export const genres = [
  "All", "Electronic", "Pop", "Hip-Hop", "Rock", "Jazz", "Lo-Fi", "Ambient", "Soul", "Folk", "World", "Synthwave",
]

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}
