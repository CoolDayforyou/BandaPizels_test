import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export function useThemeColor(colorName: keyof typeof Colors) {
  const theme = useContext(ThemeContext);
  return theme.darkColors[colorName];
}
