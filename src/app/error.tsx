import Link from 'next/link';

export default function ErrorPage({ statusCode }: { statusCode?: number }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">
        {statusCode ? `${statusCode} Error` : 'An error occurred'}
      </h1>
      <p className="mt-4 text-lg">
        {statusCode === 404
          ? "The page you're looking for doesn't exist."
          : 'Something went wrong on our end.'}
      </p>
      <Link href="/" className="mt-6 text-blue-600 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}