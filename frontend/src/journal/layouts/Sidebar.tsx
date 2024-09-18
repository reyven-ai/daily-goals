import { SignOutButton } from '@clerk/clerk-react';

import { PiSidebarSimple } from 'react-icons/pi';
import { PiSignOut } from 'react-icons/pi';
import FolderList from '@/folder/pages/FolderList';
import CreateFolder from '@/folder/pages/CreateFolder';

export default function Sidebar(): JSX.Element {
  return (
    <div className="w-[230px] flex flex-col justify-between h-[100vh] bg-[#f9f9f9]">
      <div>
        <div>
          <div className=" border-b text-[#7d7d7d] text-[24px] font-semibold p-2.5">
            <PiSidebarSimple style={{ strokeWidth: 2.5 }} />
          </div>
          <menu className="">
            <FolderList />
            <CreateFolder />
          </menu>
        </div>
      </div>
      <div className="p-5 mb-3 flex items-center gap-[16px] text-[#7d7d7d] text-opacity-100 text-[14px]">
        <p className="text-[20px] text-[#7d7d7d]">
          <PiSignOut />
        </p>
        <SignOutButton />
      </div>
    </div>
  );
}
