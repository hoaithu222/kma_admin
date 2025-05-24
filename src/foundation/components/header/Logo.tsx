import logo from "@/assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-16">
        <img src={logo} alt="logo" className="object-contain w-full h-full" />
      </div>
    </div>
  );
};

export default Logo;
