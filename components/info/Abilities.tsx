export const Abilities = ({ list }: { list?: string[] }) =>
  list?.length && (
    <div className="flex flex-row gap-2 my-3">
      <div>Abilities: </div>
      {list.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
