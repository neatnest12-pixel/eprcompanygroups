import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="container-shell section-shell flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
        404
      </p>
      <h1 className="text-5xl font-bold tracking-tight text-slate-900">Page not found</h1>
      <p className="max-w-xl text-base text-gray-500 leading-relaxed">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-600"
      >
        Back to Home
      </Link>
    </div>
  );
}
