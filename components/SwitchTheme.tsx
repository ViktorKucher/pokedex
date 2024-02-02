import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Switch } from "antd";
import { useTheme } from "next-themes";

export const SwitchTheme = ({style}:{style?:string}) => {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <div className={style}>
      <Switch
        style={resolvedTheme === "light" ? { backgroundColor: "black" } : {}}
        defaultChecked={resolvedTheme === "dark"}
        checkedChildren={<MoonFilled />}
        unCheckedChildren={<SunFilled />}
        onChange={(checked: boolean) =>
          checked ? setTheme("dark") : setTheme("light")
        }
      />
    </div>
  );
};
