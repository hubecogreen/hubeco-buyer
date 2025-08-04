
import dynamic from 'next/dynamic';
import Link from "next/link";
import animationData from "../../../public/animations/404.json";

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

const Custom404: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="flex items-center flex-col text-center bg-white">
        <Lottie
          animationData={animationData}
          loop={true}
          style={{ width: 400, height: 400 }}
        />

        <div className="flex flex-col gap-2 w-[90vw] sm:w-auto mb-6">
          <h2 className="text-4xl text-gray-800 font-semibold">
            Page Not Found ⚠️
          </h2>
          <p className="text-gray-700">
            We couldn&#39;t find the page you are looking for.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded font-semibold text-secondary bg-blue-600 hover:bg-blue-700 hover:text-primary"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
