type Props = {
  label: string;
  value: string;
};

export const InfoItem = ({ label, value }: Props) => {
  return (
    <div className="m-5">
      <div className=" text-[16px] md:text-[20px]">{label}</div>
      <div className=" text-[24px]  md:text-[37px] text-amber-900 font-bold">
        {value}
      </div>
    </div>
  );
};
