import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";

const ListPost = () => {
  return (
    <div>
      <Table columns={[]} data={[]} emptyText={<Empty />} />
    </div>
  );
};

export default ListPost;
