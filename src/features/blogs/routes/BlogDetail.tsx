import { useParams } from "react-router-dom";
import { useBlog } from "../api/getBlog";

interface IProps {}

const BlogDetail: React.FC<IProps> = () => {
  const { id } = useParams();

  const blogQuery = useBlog({ blogId: id });

  if (blogQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (!blogQuery.data) {
    return null;
  }

  return (
    <div className="p-4">
      <p>Ok</p>
    </div>
  );
};

export default BlogDetail;
