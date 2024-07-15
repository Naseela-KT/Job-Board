import { Navbar, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function NavbarDefault() {

  return (
    <Navbar className="fixed top-0 w-full z-10 bg-[#01071E] px-4 py-2 lg:px-8 lg:py-3 rounded-none">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            color="white"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Home
          </Typography>
        </Link>
      </div>
    </Navbar>
  );
}
