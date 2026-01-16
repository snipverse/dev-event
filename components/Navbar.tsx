import Link from "next/link"
import Image from "next/image"
const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="Logo">
          <Image src="/icons/logo.png" alt="Logo" width={24} height={24} />

          <p>DevEvent</p>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/">Events</Link>
          <Link href="/">Create Event</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar