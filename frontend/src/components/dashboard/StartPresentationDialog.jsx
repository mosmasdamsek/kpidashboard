import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { ArrowForward, Close, Slideshow } from "@mui/icons-material";

const StartPresentationDialog = ({ open, onClose, onStart }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "rgba(8,17,31,0.96)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          overflow: "hidden",
          backdropFilter: "blur(18px)",
          boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,140,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.20),transparent_35%)]" />

          <div className="relative p-8 md:p-10">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "16px",
                    background:
                      "linear-gradient(135deg, rgba(79,140,255,0.22) 0%, rgba(139,92,246,0.22) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Slideshow sx={{ color: "#dbeafe" }} />
                </Box>

                <div>
                  <Typography sx={{ fontSize: 24, fontWeight: 900 }}>
                    Start EXCO Presentation
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.68)", mt: 0.5 }}>
                    Launch full-screen divisional presentation mode for executive review.
                  </Typography>
                </div>
              </div>

              <IconButton
                onClick={onClose}
                sx={{
                  color: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  bgcolor: "rgba(255,255,255,0.03)",
                }}
              >
                <Close />
              </IconButton>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-3">
              {[
                "One division per slide",
                "Boardroom-ready visuals",
                "Full-screen navigation",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                  <p className="text-sm font-semibold text-white/90">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  px: 2.2,
                  py: 1.2,
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={onStart}
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  textTransform: "none",
                  borderRadius: "14px",
                  px: 2.6,
                  py: 1.2,
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, #4f8cff 0%, #8b5cf6 100%)",
                  boxShadow: "0 18px 40px rgba(79,140,255,0.35)",
                }}
              >
                Start Presentation
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartPresentationDialog;