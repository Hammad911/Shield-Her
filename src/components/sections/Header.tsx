import Image from 'next/image';

export default function Header() {
  return (
    <nav className="bg-fuchsia-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center">
    <Image src="/logoreal.png" alt="SafeGuard Logo" width={50} height={40} />

      <h1 className="text-2xl font-bold">Shield-Her</h1>
    </div>
  </div>
  <ul className="flex space-x-4">
    <li><a href="/landing" className="hover:text-pink-200 transition">Home</a></li>
    <li><a href="/main" className="hover:text-pink-200 transition">DefenSync</a></li>
    <li><a href="/shop" className="hover:text-pink-200 transition">Shop</a></li>
  </ul>
</div>
</nav>
  );
}
