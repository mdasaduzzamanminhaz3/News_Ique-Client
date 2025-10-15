
const ArticleCard = () => {
    return (
        <div >

            <div className=" p-3 mx-2 my-3 rounded shadow-sm">
    
                <div className="flex flex-col sm:flex-row gap-2 ">
                  <h3 className="font-bold text-2xl flex-1">
                    গাজায় যুদ্ধবিরতি: ইসরায়েল-হামাসের সম্মতি নিয়ে বিশ্বনেতারা কে কী
                    বললেন
                  </h3>
                  <img
                    src="/src/assets/images/img1.jpg"
                    alt=""
                    className="rounded mt-2 w-full sm:w-32 sm:h-32 object-cover"
                  />
                </div>
                <div className="mt-2">
                  <span className="block">
                    দুই বছর ধরে চলা গাজা যুদ্ধে এই অগ্রগতিকে অনেকের কাছে বড় ধরনের
                    সাফল্য হিসেবে দেখা হচ্ছে।
                  </span>
                  <span className="text-gray-400 text-sm">১ ঘণ্টা আগে</span>
                </div>
             
        
          </div>        
            
        </div>
       
    );
};

export default ArticleCard;