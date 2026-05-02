import { Link } from "react-router-dom";

function PageHeader({ title }) {
  return (
    <section className="bg-red-600 opacity-80 text-white py-5 text-center">
      <h1 className="text-4xl md:text-3xl font-bold mb-5 tracking-wide">
        {title}
      </h1>

      <div className="text-md text-gray-300">
        <Link to="/" className="hover:text-white">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white">{title}</span>
      </div>
    </section>
  );
}

export default PageHeader;