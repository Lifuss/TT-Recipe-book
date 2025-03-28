import Logo from "./Logo";

const Footer = () => {
  const aClassName =
    "text-blue-500 hover:text-blue-800 focus:text-blue-800 active:text-blue-800";
  return (
    <footer className="border-t bg-gray-200 border-gray-300 pt-4">
      <div className="grid grid-cols-2 gap-4 container mx-auto">
        <div>
          <Logo />
        </div>
        <div className="ml-auto">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Contacts</h3>
            <a className={aClassName} href="mailto:arsen.hryh@gmail.com">
              <span className="text-black">E-mail: </span>
              <span className="underline">arsen.hryh@gmail.com</span>
            </a>
          </div>
        </div>
        <div className="col-span-2 text-center text-sx">
          <p>Do everything you want</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
