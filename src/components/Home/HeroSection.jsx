import { formatPublishedDate } from "../utils/formatDate";

const HeroSection = ({featured}) => {

    return (
        <div>
            <div className="p-2 mx-auto"> 
            <h1 className="font-bold text-red-500 text-3xl p-2 ">Latest News</h1>
            <div className="p-3 rounded bg-gradient-to-br to-purple-50 from-blue-50 shadow-sm mx-2 my-2">
            <h3 className="block font-semibold">
             {featured?.headline || "Loading..."}
              </h3>
              <div className="flex flex-col mt-2">

              <span>
                {featured?.body.substring(0, 150) || ''}...
              </span>
            <span className="text-gray-400 text-sm">{formatPublishedDate(featured?.published_at)}</span>
              </div>

            </div>
        </div>
        </div>
    );
};

export default HeroSection;