import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";

const LitsCategory = () => {
  return (
    <div>
      <Table columns={[]} data={[]} emptyText={<Empty variant="data" />} />
    </div>
  );
};

export default LitsCategory;
