type Props = {
  label: string;
  icon?: any;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const Button = ({ label, icon, onClick }: Props) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className=" flex bg-sky-500 gap-2 px-5 py-3 rounded-md text-white  hover:bg-sky-600 transition duration-300">
        {icon && <div>{icon}</div>}
        <div className="font-bold items-center">{label}</div>
      </div>
    </div>
  );
};
