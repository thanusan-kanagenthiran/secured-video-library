"use client";

import SecuredVideoPlayer from "@/components/SecuredVideoPlayer";

const VIDEO_URL = "https://youtu.be/SeO5lJm6wjQ";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            🔒 Secured Video Player POC
          </h1>
          <p className="text-zinc-400">
            YouTube video player with security features to prevent unauthorized access
          </p>
        </div>

        {/* Video Player */}
        <div className="bg-zinc-800 rounded-xl p-1 shadow-2xl">
          <SecuredVideoPlayer videoUrl={VIDEO_URL} className="w-full aspect-video" />
        </div>


      </div>
    </main>
  );
}


