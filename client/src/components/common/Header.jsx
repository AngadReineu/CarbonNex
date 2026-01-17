

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-300 to-emerald-400">

      <div className="w-full px-7 py-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#60BCF9] to-[#0798C1] text-white rounded-lg flex items-center justify-center font-bold text-2xl shadow-md">
  {/* <img src="" alt='logo'/> */}
  CN
</div>
          <div>
            <h1 className="text-2xl font-bold">CarbonNex</h1>
            <p className="text-emerald-100 text-sm">Your Compliance Portal</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;