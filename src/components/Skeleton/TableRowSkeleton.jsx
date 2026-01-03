
const TableRowSkeleton = () => {
    return (
<tr className="border-t animate-pulse">
      <td className="px-4 py-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="px-4 py-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="h-4 bg-gray-200 rounded w-40"></div>
      </td>
      <td className="px-4 py-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </td>
      <td className="px-4 py-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
    </tr>
    );
};

export default TableRowSkeleton;