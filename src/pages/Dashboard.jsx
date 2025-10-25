import { FiStar, FiUsers } from "react-icons/fi";
import StatCard from "../components/Dashboard/StatCard";
import { MdArticle, MdPublishedWithChanges } from "react-icons/md";

export default function Dashboard() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={MdArticle} title="Total Articles" value="245" />
        <StatCard icon={MdPublishedWithChanges} title="Total Published" value={128} />
        <StatCard icon={FiUsers} title="Total Users" value={573} />
        <StatCard icon={FiStar} title="Average Rating" value={4.8} />
      </div>

    </div>
  );
}