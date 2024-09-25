import { SignOutButton } from '@clerk/clerk-react';

import { PiSidebarSimple } from 'react-icons/pi';
import { PiSignOut } from 'react-icons/pi';
import FolderList from '@/folder/pages/FolderList';
import CreateFolder from '@/folder/pages/CreateFolder';
import { Button } from '@/components/ui/button';

export default function Sidebar(): JSX.Element {
  return (
    <div className="w-[230px] flex flex-col justify-between h-[100vh] bg-[#f9f9f9]">
      <div>
        <div>
          <div className="border-b p-1.5">
            <Button className="bg-transparent text-secondary text-[24px] font-semibold hover:bg-[#ececec] py-0.5 px-3">
              <PiSidebarSimple style={{ strokeWidth: 2.5 }} />
            </Button>
          </div>
          <menu className="">
            <FolderList />
            <CreateFolder />
          </menu>
        </div>
      </div>
      <div className="p-5 mb-3 flex items-center gap-[16px] text-secondary text-opacity-100 text-[14px]">
        <p className="text-[20px] text-secondary">
          <PiSignOut />
        </p>
        <SignOutButton />
      </div>
    </div>
  );
}
