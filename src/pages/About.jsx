
const About = () => {
    return (
        <div className="max-w-screen-md mx-auto w-full h-auto p-4 my-6 rounded shadow-sm bg-white">
          <div className="space-y-4">
            <h3 className="font-bold text-2xl md:text-3xl">Hello</h3>
            <img
              src= "/src/assets/images/Image-not-found.png"
              alt=""
              className="rounded w-full h-auto object-cover"
            />
          </div>
          <div className="mt-4">
            <p className="text-base md:text-lg leading-relaxed text-gray-800 whitespace-pre-line">
              ami hoilam body
            </p>
            <span className="text-gray-400 text-sm block mt-4">
              ami hoilam tarikh
            </span>
          </div>
        </div>
    );
};

export default About;