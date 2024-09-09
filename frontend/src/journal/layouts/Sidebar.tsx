import { NavLink } from "react-router-dom";
import { SignOutButton } from "@clerk/clerk-react";
import { useGetJournalsQuery } from "@/graphql/generated";
import { MenuLink } from "../types/sidebar";

import { PiSidebarSimple } from "react-icons/pi";
import { PiSignOut } from "react-icons/pi";
import { BsJournalPlus } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

const menuLinks: MenuLink[] = [
  {
    path: "/create-journal",
    name: "New Personal Journal",
    icon: <AiOutlinePlus />,
  },
];

export default function Sidebar(): JSX.Element {
  const { data } = useGetJournalsQuery();

  const totalJournals = data?.getJournals?.length || null;

  return (
    <div className="w-[220px] flex flex-col justify-between h-[100vh] bg-[#f9f9f9]">
      <div>
        <div>
          <div className=" border-b text-[#7d7d7d] text-[24px] font-semibold p-2.5">
            <PiSidebarSimple style={{ strokeWidth: 2.5 }} />
          </div>
          <menu className="">
            <ul className="mt-[1rem] p-2 w-[220px]">
              <li className="mb-2">
                <NavLink
                  to="/journals"
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-2 items-center justify-between text-black text-opacity-100 rounded-[4px] bg-[#ececec]"
                      : "flex p-2 justify-between text-black text-opacity-65"
                  }
                >
                  <div className="flex items-center gap-[10px] font-[400]">
                    <p className="text-[18px] mr-[4px]">
                      <BsJournalPlus />
                    </p>
                    <p className="text-[14px] mt-[2px]">Journals</p>
                  </div>
                  <div>
                    <span className="text-[12px]">{totalJournals}</span>
                  </div>
                </NavLink>
              </li>
              {menuLinks.map(({ path, name, icon }, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-[10px] text-black text-opacity-100 text-[14px] p-2 rounded-[4px] bg-[#ececec]"
                        : "flex items-center gap-[10px] text-black text-opacity-65 text-[14px] font-[400] p-2"
                    }
                  >
                    <p className="text-[18px] mr-[4px]">{icon}</p>
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </menu>
        </div>
      </div>
      <div className="p-5 mb-3 flex items-center gap-[10px] text-[#7d7d7d] text-opacity-100 text-[14px]">
        <p className="text-[20px] mr-[4px] text-[#7d7d7d]">
          <PiSignOut />
        </p>
        <SignOutButton />
      </div>
    </div>
  );
}
