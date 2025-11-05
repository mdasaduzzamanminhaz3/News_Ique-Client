const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Discover Our Story</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Welcome to <strong>NewsIque</strong>, where journalism meets integrity and passion. Since our inception, we’ve been committed to delivering honest, accurate, and impactful news to our readers.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Mission</h2>
          <p className="text-gray-700">
            To inform, educate, and inspire. We strive to provide our readers with news that matters, ensuring every article is thoroughly researched and thoughtfully written.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Our History</h2>
          <p className="text-gray-700">
            NewsIque was founded in 2020 with a vision to create a trusted source of news. Over the years, we’ve grown, but our core values of honesty, integrity, and quality journalism remain unchanged.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Team</h2>
          <p className="text-gray-700">
            Our team of dedicated journalists, editors, and contributors are the heart of NewsIque. With diverse backgrounds and a shared passion for storytelling, they work tirelessly to bring you the latest news and in-depth analysis.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Values</h2>
          <p className="text-gray-700">
            Integrity, accuracy, and impartiality are the cornerstone of our work. We believe in holding power to account, giving voice to the voiceless, and making a positive impact through responsible journalism.
          </p>
        </div>
      </section>

      <footer className="mt-10 text-center text-sm text-gray-500">
        © 2025 NewsIque | Contact: info@newsique.com
      </footer>
    </div>
  );
};

export default About;