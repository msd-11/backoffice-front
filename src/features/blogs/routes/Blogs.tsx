import { useBlogs } from "../api/getBlogs";
import { columns } from "../components/columns";
import { DataTable } from "../components/dataTable";

interface IProps {}

const Blogs: React.FC<IProps> = () => {
  const blogQuery = useBlogs();

  if (blogQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (!blogQuery.data) {
    return null;
  }

  return (
    <div className="p-4">
      <DataTable columns={columns} data={blogQuery.data.data} />
    </div>
  );
};

export default Blogs;
