import { IS_DEV } from "@/config/env.config";
import ColorSwitch from "./ColorSwitch";
import LightDarkPicker from "./LightDarkPicker";

export default function ThemeSwitch() {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {IS_DEV && <ColorSwitch />}
      <LightDarkPicker />
    </div>
  );
}
