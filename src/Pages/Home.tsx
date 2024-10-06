import { PiPlusBold } from "react-icons/pi";
import { useSelector } from "react-redux";

function Home() {
  const { allProducts } = useSelector((state: any) => state.products);

  console.log(allProducts?.[0]?.bottomBG); // Log only if allProducts is available

  return (
    <div className="w-full h-[92vh] bg-[#030303]">
      <div className="h-full w-[90%] mx-auto flex">
        {/* Left Section */}
        <div className="left md:flex items-start hidden  md:w-[20%] h-full bg-[#030303] border-r p-4">
          <div className="flex items-start justify-between w-full gap-4 lg:items-center lg:flex-row md:flex-col">
            <h2 className="text-xl text-white font-Neue">Sort By:</h2>
            <select className="p-2 text-white font-Neue bg-gray-700 rounded-lg w-[60%]">
              <option value="Popular">Popular</option>
              <option value="Newest">Newest</option>
              <option value="Rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Right Section */}
        <div className="right w-[100%] md:w-[80%] p-4">
          {/* Content for right section */}
          <div className="grid w-full h-full grid-cols-1 gap-6 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 scroll-bar-hide card-container">
            {allProducts?.map((product: any) => {
              return (
                <div
                  key={product._id}
                  className={`w-full transition-transform transform rounded-lg shadow-lg overflow-hidden h-72 card`} // Use w-full to make cards responsive
                >
                  {/* Image Section */}
                  <div className="w-full overflow-hidden h-2/3 rounded-t-md image-container">
                    <img
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out bg-center hover:scale-110"
                      src={product.image}
                      alt={product.name} // Use product name for alt text
                    />
                  </div>

                  {/* Info Section */}
                  <div
                    className="flex items-center justify-between w-full px-4 py-2 text-white h-1/3 rounded-b-md"
                    style={{ backgroundColor: product.bottomBG }} // Using inline styles for dynamic background
                  >
                    <div className="flex flex-col">
                      <h2 className="text-lg font-semibold">{product.name}</h2>
                      <h2 className="text-gray-300 text-md">
                        ₹{product.price}
                      </h2>
                    </div>

                    <div className="flex items-center justify-center w-10 h-10 transition-colors bg-white rounded-full cursor-pointer shine">
                      <PiPlusBold className="text-2xl text-black" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
