import Link from 'next/link';
import { FiShieldOff, FiArrowLeft } from 'react-icons/fi';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#05060a] text-white flex items-center justify-center px-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10" />
        
        <div className="relative z-10">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-300">
            <FiShieldOff className="text-4xl" />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-red-300">
            401 Unauthorized
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Access Denied
          </h1>

          <p className="mt-4 text-sm leading-7 text-zinc-400">
            You do not have permission to view this page. Please sign in with the correct account and try again.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
            >
              Sign In
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <FiArrowLeft />
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}