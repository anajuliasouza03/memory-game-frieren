import logo from "@/assets/logo.png";
import { GridItemType } from "@/types/GridItemType";
import Image from "next/image";
import { items } from "@/data/items";

type Props = {
  item: GridItemType;
  onClick: () => void;
};

export const GridItem = ({ item, onClick }: Props) => {
  return (
    <div onClick={onClick} className="  my-auto cursor-pointer">
      {item.permanenShown === false && item.shown === false && (
        <Image
          alt="logo"
          src={logo}
          className=" hover:opacity-100 hover:border-blue-500 rounded-[10px] border-2 border-cyan-200 bg"
        />
      )}
      {(item.permanenShown || item.shown) && item.item !== null && (
        <Image
          alt="card"
          src={items[item.item].icon}
          className="rounded-[10px]  border-cyan-400 border-3"
        />
      )}
    </div>
  );
};
