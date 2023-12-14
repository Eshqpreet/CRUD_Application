import { NavLink } from "react-router-dom";
import { IoPerson } from "react-icons/io5";

const Header = () => {
    const navLinks = [
        {
            path: "/",
            display: "Employees"
        },
        {
            path: "/create",
            display: "Add Employee"
        },
        {
            path: "/overvieweddashboard",
            display: "Dashboard"
        }
    ];

    return (
        <header className="flex flex-col md:w-[250px] w-[200px] h-full border-r-[2.5px] border-solid border-[#000] bg-[#E5D4FF] fixed top-0 left-0  z-[1000]">
            <div className="flex items-center pt-[80px]">
                <h1 className="md-[840px]:text-[25px] text-[20px] leading-7 font-bold text-[#000] pl-[20px] w-full h-full">
                    Admin Panel
                </h1>
                <span className="w-[80px]">
                    <IoPerson className="md-[840px]:text-[30px] text-[20px]" />
                </span>
            </div>
            <ul className="flex flex-col pl-[35px] pt-[30px] overflow-y-auto">
                {navLinks.map((link, index) => (
                    <li key={index} className="pt-[20px]">
                        <NavLink to={link.path} className={navClass => navClass.isActive ? 'text-[#000] md-[840px]:text-[18px] text-[16px] leading-7 font-bold ' : 'text-[#000] md-[840px]:text-[16px]  text-[]leading-7 font-semibold hover:text-[#000]'}>{link.display}</NavLink>
                    </li>
                ))}
            </ul>
        </header>
    );
};

export default Header;
