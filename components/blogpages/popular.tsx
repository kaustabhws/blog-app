const PopularPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Most Popular</h1>
      <div className="mt-5 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-sm bg-red-400 w-max px-2 rounded-2xl">
            Travel
          </div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          <div className="dark:text-gray-400 text-sm">
            Lorem, ipsum - 12th May 2021
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm bg-red-400 w-max px-2 rounded-2xl">
            Travel
          </div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          <div className="dark:text-gray-400 text-sm">
            Lorem, ipsum - 12th May 2021
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm bg-red-400 w-max px-2 rounded-2xl">
            Travel
          </div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          <div className="dark:text-gray-400 text-sm">
            Lorem, ipsum - 12th May 2021
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPage;
