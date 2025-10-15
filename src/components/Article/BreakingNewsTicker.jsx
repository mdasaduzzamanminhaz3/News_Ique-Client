import '../../assets/css/BreakingNewsTicker.css' // Custom CSS for marquee animation

const BreakingNewsTicker = ({headlines}) => {

  return (
    <div className="bg-red-600 text-white py-2 px-4">
      <div className="font-bold uppercase tracking-wide mb-1 animate-pulse">Breaking News</div>
      <div className="overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block font-semibold font-serif">
          {headlines.map((headline, index) => (
            <span key={index} className="mx-4">{headline}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default BreakingNewsTicker;