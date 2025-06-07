export default function HomePage() { return ( <main className="min-h-screen bg-gray-950 text-white font-sans"> <header className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 shadow-xl"> <h1 className="text-4xl font-bold text-white">Toonix TV</h1> <p className="text-sm mt-1">Movies, Anime, Cartoons & Shows - Straight from Telegram</p> </header>

<section className="p-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {/* Sample content cards */}
    {['One Piece', 'Spider-Man: Into the Spider-Verse', 'Naruto', 'Rick and Morty'].map((title, idx) => (
      <div key={idx} className="bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-pink-500 transition-shadow">
        <div className="h-40 bg-gray-700 rounded-xl mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-300">Click below to watch or download via our Telegram channel.</p>
        <a
          href="https://t.me/ToonixTV"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 px-4 py-2 bg-pink-500 rounded-xl text-white hover:bg-pink-600"
        >
          Watch Now
        </a>
      </div>
    ))}
  </section>

  <footer className="text-center p-4 text-gray-400 text-sm border-t border-gray-700">
    © 2025 Toonix TV · Powered by Telegram
  </footer>
</main>

); }

