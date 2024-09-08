import { NavLink } from "react-router-dom";
import { SignOutButton } from "@clerk/clerk-react";
import { useGetJournalsQuery } from "@/graphql/generated";
import { MenuLink } from "../types/sidebar";

import sidebar from "../../assets/sidebar.svg";
import signout from "../../assets/signout.svg";
import add from "../../assets/add.svg";
import journal from "../../assets/journal.svg";

const menuLinks: MenuLink[] = [
  { path: "/create-journal", name: "New Personal Journal", img: add },
];

export default function Sidebar(): JSX.Element {
  const { data } = useGetJournalsQuery();

  const totalJournals = data?.getJournals?.length || null;

  return (
    <div className="w-[220px] flex flex-col justify-between h-[100vh] bg-[#f9f9f9]">
      <div>
        <div>
          <div className="p-2 border-b">
            <img src={sidebar} alt="" />
          </div>
          <menu className="">
            <ul className="mt-[1rem] w-[220px]">
              <li className="mb-2">
                <NavLink
                  to="/journals"
                  className={({ isActive }) =>
                    isActive
                      ? "flex p-2 justify-between text-black text-opacity-100 rounded-[4px] bg-[#ececec]"
                      : "flex p-2 justify-between text-black text-opacity-65"
                  }
                >
                  <div className="flex items-center gap-[10px] text-[14px] font-[400]">
                    <img src={journal} alt="" /> Journals
                  </div>
                  <div>
                    <span className="text-[12px]">{totalJournals}</span>
                  </div>
                </NavLink>
              </li>
              {menuLinks.map(({ path, name, img }, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-[10px] text-black text-opacity-100 text-[14px] p-2 rounded-[4px] bg-[#ececec]"
                        : "flex items-center gap-[10px] text-black text-opacity-65 text-[14px] font-[400] p-2"
                    }
                  >
                    <img src={img} alt="" />
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </menu>
        </div>
      </div>
      <div className="p-4 flex items-center gap-[10px] text-black text-opacity-100 text-[14px]">
        <img src={signout} alt="" />
        <SignOutButton />
      </div>
    </div>
  );
}
