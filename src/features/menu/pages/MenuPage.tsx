import clsx from "clsx";
// import Button from "@/foundation/components/buttons/Button";
// import { PlusIcon } from "lucide-react";

// import { useMenu } from "../hooks/useMenu";
import ListMenu from "../components/ListMenu";

const MenuPage = () => {
  // const {
  //   handleAddMenu,
  //   isAddMenu,
  //   handleEditMenu,
  //   isEditMenu,
  //   handleDeleteMenu,
  // } = useMenu();

  return (
    <div
      className={clsx(
        "p-3 h-full rounded-lg border shadow-sm shadow-text-primary",
        "overflow-auto relative border-border-primary bg-background-base text-text-primary hidden-scrollbar"
      )}
    >
      <div className="flex justify-between items-center border-b-2 border-border-primary">
        <div className="flex gap-2 items-center p-2">
          <h2 className="text-2xl font-bold text-secondary">Danh mục menu</h2>
        </div>
        {/* <Button
          variant="outlinedSecondary"
          iconLeft={<PlusIcon className="w-4 h-4 hover:animate-spin" />}
          onClick={() => handleAddMenu()}
        >
          Thêm menu
        </Button> */}
      </div>
      <div className="mt-4">
        <ListMenu />
      </div>
      {/* {isAddMenu && <AddMenu />} */}
    </div>
  );
};

export default MenuPage;
