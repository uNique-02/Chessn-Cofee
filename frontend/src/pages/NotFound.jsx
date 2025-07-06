import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-block bg-red-500 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
