"use client";

import SecuredVideoPlayer from "@/components/SecuredVideoPlayer";

// Hardcoded YouTube URL for POC
const VIDEO_URL = "https://youtu.be/gmsEDydA_-I";

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
        <div className="bg-zinc-800 rounded-xl p-4 shadow-2xl">
          <SecuredVideoPlayer videoUrl={VIDEO_URL} className="w-full aspect-video" />
        </div>

        {/* Security Features List */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <SecurityFeature
            icon="🛡️"
            title="Right-Click Disabled"
            description="Context menu is blocked to prevent 'Save Video' options"
          />
          <SecurityFeature
            icon="👁️"
            title="Tab Visibility Detection"
            description="Video pauses when you switch tabs or minimize window"
          />
          <SecurityFeature
            icon="🔧"
            title="DevTools Detection"
            description="Video stops and shows warning when developer tools are opened"
          />
          <SecurityFeature
            icon="🎮"
            title="Custom Controls"
            description="Native YouTube controls hidden, replaced with custom UI"
          />
          <SecurityFeature
            icon="⌨️"
            title="Keyboard Shortcuts Disabled"
            description="YouTube keyboard shortcuts are blocked"
          />
          <SecurityFeature
            icon="🔒"
            title="No-Cookie Embed"
            description="Uses youtube-nocookie.com for enhanced privacy"
          />
          <SecurityFeature
            icon="🚫"
            title="No Related Videos"
            description="Related videos and YouTube branding are hidden"
          />
          <SecurityFeature
            icon="📱"
            title="Fullscreen Support"
            description="Custom fullscreen implementation with controls"
          />
        </div>

        {/* Test Instructions */}
        <div className="mt-8 bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h2 className="text-xl font-semibold text-white mb-4">🧪 Test the Security Features</h2>
          <ul className="space-y-2 text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">1.</span>
              <span>Right-click on the video - context menu should be blocked</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">2.</span>
              <span>Play the video, then switch to another tab - video should pause</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">3.</span>
              <span>Open DevTools (F12) - video should stop with a warning overlay</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">4.</span>
              <span>Try dragging the video - it should not be draggable</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

function SecurityFeature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="text-white font-medium">{title}</h3>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
