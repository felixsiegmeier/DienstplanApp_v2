import Link from "next/link";
import { usePageContext } from "../context/pageContext";
export default function NavButton({ href, title }) {
  const { isMobile } = usePageContext();
  return (
    <Link
      href={href}
      className={`block select-none mt-4 ${
        !isMobile ? "inline-block mt-0" : null
      } text-gray-200 hover:text-white mr-4`}
    >
      {title}
    </Link>
  );
}
