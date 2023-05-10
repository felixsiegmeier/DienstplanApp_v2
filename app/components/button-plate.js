import Link from "next/link";

export default function ButtonPlate({ title, explaination, link, style }) {
  return (
    <Link
      href={link}
      className={`${style} text-slate-800 font-bold py-4 px-8 rounded-lg flex flex-col shadow-lg hover:shadow-sm items-center justify-center transition-colors`}
    >
      <span>→ {title}</span>
      <span className="ml-2 text-gray-600 text-sm text-center mt-2">
        {explaination}
      </span>
    </Link>
  );
}
