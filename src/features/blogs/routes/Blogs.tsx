import { useBlogs } from "../api/getBlogs";
import { columns } from "../components/columns";
import { DataTable } from "../components/dataTable";

interface IProps {}

const Blogs: React.FC<IProps> = () => {
  const blogQuery = useBlogs();

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={blogQuery.data ? blogQuery.data.data : []}
        isLoading={blogQuery.isLoading}
      />
    </div>
  );
};

export default Blogs;
