import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className="p-6 border-b-2 flex flex-col md:flex-row items-center justify-between">
      <p className="text-sm font-bold text-center md:text-left">
        ⚡️ Southern California Edison Energy Usage Tool
      </p>
      <Link href="https://github.com/ndanny/sce-energy-parser" target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-0">
        <GitHubLogoIcon className="w-6 h-6 text-gray-600 hover:text-black" />
      </Link>
    </div>
  );
};
