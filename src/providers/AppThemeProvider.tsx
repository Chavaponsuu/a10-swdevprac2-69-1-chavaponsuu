"use client";

import type { ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563EB",
      dark: "#1D4ED8",
      light: "#EFF6FF",
      contrastText: "#FFFFFF",
    },
    background: { default: "#F8FAFC", paper: "#FFFFFF" },
    divider: "#E2E8F0",
    text: { primary: "#334155", secondary: "#64748B", disabled: "#94A3B8" },
    action: {
      active: "#64748B",
      disabled: "#94A3B8",
      disabledBackground: "#F8FAFC",
      hover: "#EFF6FF",
      selected: "#EFF6FF",
      focus: "#EFF6FF",
    },
    success: { main: "#16A34A" },
    warning: { main: "#D97706" },
    error: { main: "#DC2626" },
    info: { main: "#2563EB" },
  },
  typography: { fontFamily: "Arial, Helvetica, sans-serif" },
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": { borderBottomColor: "#E2E8F0" },
          "&:hover:not(.Mui-disabled, .Mui-error):before": { borderBottomColor: "#2563EB" },
        },
      },
    },
    MuiRating: { styleOverrides: { root: { color: "#D97706" } } },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": { color: "#2563EB", backgroundColor: "#EFF6FF" },
        },
      },
    },
  },
});

export default function AppThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
