import ListMedia from "./components/ListMedia";

const Media = () => {
  return (
    <div className="flex overflow-auto relative flex-col gap-4 p-4 h-full rounded-lg bg-background-subtle hidden-scrollbar">
      <ListMedia />
    </div>
  );
};

export default Media;
