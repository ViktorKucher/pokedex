import { FrownFilled } from "@ant-design/icons";

export const FilledBox = () => (
  <div className="flex flex-col justify-center justify-items-center text-center gap-2">
    <FrownFilled
      className="flex flex-col justify-center"
      style={{ fontSize: "40px" }}
    />
    <div className="uppercase">Not found</div>
  </div>
);
