import { StarFilled } from "@ant-design/icons";

export const AverageRate = ({ rate }: { rate?: number }) => (
    <div className="rounded-md p-1 bg-yellow-600 text-sm flex align-middle gap-1">
      <div>
        <StarFilled
          className="inline-block align-middle"
          style={{ color: "yellow" }}
        />
      </div>
      <div>{rate || 0}</div>
    </div>
  );