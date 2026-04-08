import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { ResponsiveContainer } from "recharts";

const ChartContainer = ({
  children,
  height,
  minHeight,
  minWidth = 0,
  sx = {},
  ...props
}) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setReady(true);
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        width: "100%",
        height,
        minHeight: minHeight ?? height,
        minWidth,
        display: "block",
        overflow: "hidden",
        ...sx,
      }}
    >
      {ready ? (
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      ) : (
        <Box sx={{ width: "100%", height: "100%" }} />
      )}
    </Box>
  );
};

export default ChartContainer;