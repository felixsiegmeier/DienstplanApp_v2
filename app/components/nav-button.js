import Link from "next/link";
export default function NavButton({href, title}){
    return (
            <Link
            href={href}
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
            
              {title}
          </Link>
    )
}