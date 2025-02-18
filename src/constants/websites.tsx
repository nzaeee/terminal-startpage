export interface Link {
  name: string;
  url: string;
  description: string;
}

export const links: Link[] = [
  // dev tools & learning
  { name: 'github', url: 'https://github.com', description: 'where developers build and ship awesome software' },
  { name: 'dev.to', url: 'https://app.daily.dev', description: 'vibrant community where devs share knowledge' },
  { name: 'hackernews', url: 'https://news.ycombinator.com', description: 'tech news and intellectual discussions' },
  { name: 'perplexity', url: 'https://perplexity.com', description: 'smart ai-powered search for curious minds' },
  
  // communication & social
  { name: 'gmail', url: 'https://gmail.com', description: 'powerful email service with smart features' },
  { name: 'linkedin', url: 'https://linkedin.com', description: 'connect and grow your professional network' },
  { name: 'twitter', url: 'https://twitter.com', description: 'real-time updates from your tech sphere' },
  { name: 'youtube', url: 'https://youtube.com', description: 'endless learning and entertainment hub' },
  { name: 'plex', url: 'https://app.plex.tv/desktop/#!/', description: 'stream your media collection anywhere' },
  
  // anime & manga
  { name: 'anilist', url: 'https://anilist.co', description: 'track your favorite anime and discover new series' },
  { name: 'animepahe', url: 'https://animepahe.org', description: 'high-quality anime streaming with minimal ads' },
  { name: 'nyaa.si', url: 'https://nyaa.si', description: 'largest anime torrent tracker community' },
  { name: 'cubari', url: 'https://proxy.cubari.moe', description: 'clean and simple manga reading experience' },
]
