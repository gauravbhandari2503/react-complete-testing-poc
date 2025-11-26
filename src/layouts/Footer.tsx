function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 px-6 mt-8 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <span className="text-sm">&copy; {new Date().getFullYear()} React Testing POC. All rights reserved.</span>
        <span className="text-xs mt-2 md:mt-0">Made with <span className="text-red-500">♥</span> and Tailwind CSS</span>
      </div>
    </footer>
  );
}

export default Footer;
