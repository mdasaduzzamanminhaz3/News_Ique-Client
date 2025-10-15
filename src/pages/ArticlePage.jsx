import BreakingNewsTicker from "../components/Article/BreakingNewsTicker";

const ArticlePage = () => {
    const headlines = [
  "Major event just happened!",
  "New policy announced today.",
  "Sports team wins championship!",
  "Tech company releases new product."
];
    return (
        <div>
        <div className="App">
      <BreakingNewsTicker headlines={headlines} />
    </div>

        </div>
    );
};

export default ArticlePage;