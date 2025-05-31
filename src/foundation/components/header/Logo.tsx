import logo from "@/assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
        <img src={logo} alt="logo" className="object-contain w-full h-full" />
      </div>
    </div>
  );
};

export default Logo;
