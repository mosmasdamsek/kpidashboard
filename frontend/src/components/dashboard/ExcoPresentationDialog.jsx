import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import {
  Close,
  ChevronLeft,
  ChevronRight,
  Slideshow,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";
import DivisionPresentationSlide from "./DivisionPresentationSlide";
import { divisionWorkflowMock } from "../../data/divisionWorkflowMock";

const mockDivisions = [
  divisionWorkflowMock,
  {
    ...divisionWorkflowMock,
    division: {
      ...divisionWorkflowMock.division,
      id: "technical",
      name: "Technical",
      head: "Marcus Dlamini",
      role: "CTO",
      score: 91,
      status: "approved",
    },
  },
  {
    ...divisionWorkflowMock,
    division: {
      ...divisionWorkflowMock.division,
      id: "commercial",
      name: "Commercial",
      head: "Naledi Mpho",
      role: "Chief Commercial Officer",
      score: 86,
      status: "submitted",
    },
  },
];

const ExcoPresentationDialog = ({ open, onClose }) => {
  const divisions = useMemo(() => mockDivisions, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % divisions.length);
  }, [divisions.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + divisions.length) % divisions.length);
  }, [divisions.length]);

  const enterFullscreen = useCallback(() => {
    const el = document.documentElement;

    if (el.requestFullscreen) {
      return el.requestFullscreen();
    }
    if (el.webkitRequestFullscreen) {
      return el.webkitRequestFullscreen();
    }
    if (el.msRequestFullscreen) {
      return el.msRequestFullscreen();
    }
    return Promise.resolve();
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen && document.fullscreenElement) {
      return document.exitFullscreen();
    }
    if (document.webkitExitFullscreen && document.webkitFullscreenElement) {
      return document.webkitExitFullscreen();
    }
    if (document.msExitFullscreen && document.msFullscreenElement) {
      return document.msExitFullscreen();
    }
    return Promise.resolve();
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      const fullscreenActive =
        !!document.fullscreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.msFullscreenElement;

      if (fullscreenActive) {
        await exitFullscreen();
      } else {
        await enterFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen toggle failed:", error);
    }
  }, [enterFullscreen, exitFullscreen]);

  const handleClose = useCallback(async () => {
    try {
      await exitFullscreen();
    } catch (error) {
      console.error("Exiting fullscreen failed:", error);
    } finally {
      onClose();
    }
  }, [exitFullscreen, onClose]);

  useEffect(() => {
    const syncFullscreenState = () => {
      const fullscreenActive =
        !!document.fullscreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.msFullscreenElement;

      setIsFullscreen(fullscreenActive);
    };

    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener("webkitfullscreenchange", syncFullscreenState);
    document.addEventListener("msfullscreenchange", syncFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      document.removeEventListener("webkitfullscreenchange", syncFullscreenState);
      document.removeEventListener("msfullscreenchange", syncFullscreenState);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      enterFullscreen().catch((error) => {
        console.error("Entering fullscreen failed:", error);
      });
    }, 250);

    return () => clearTimeout(timer);
  }, [open, enterFullscreen]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goNext, goPrev, handleClose]);

  const active = divisions[currentIndex];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: "#030917",
          color: "#fff",
        },
      }}
    >
      <div className="relative flex h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(79,140,255,0.12),transparent_25%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_25%),linear-gradient(180deg,#020817_0%,#071126_100%)]">
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <Slideshow />
            </div>

            <div>
              <Typography sx={{ fontSize: 20, fontWeight: 900 }}>
                EXCO Presentation Mode
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: "rgba(255,255,255,0.62)" }}>
                {active?.division?.periodName} · Slide {currentIndex + 1} of {divisions.length}
              </Typography>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              startIcon={<ChevronLeft />}
              onClick={goPrev}
              sx={{
                textTransform: "none",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.12)",
                borderRadius: "14px",
              }}
            >
              Previous
            </Button>

            <Button
              variant="contained"
              endIcon={<ChevronRight />}
              onClick={goNext}
              sx={{
                textTransform: "none",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #4f8cff 0%, #8b5cf6 100%)",
              }}
            >
              Next
            </Button>

            <Tooltip title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
              <IconButton
                onClick={toggleFullscreen}
                sx={{
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.10)",
                  bgcolor: "rgba(255,255,255,0.04)",
                  ml: 0.5,
                }}
              >
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
              </IconButton>
            </Tooltip>

            <IconButton
              onClick={handleClose}
              sx={{
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.10)",
                bgcolor: "rgba(255,255,255,0.04)",
              }}
            >
              <Close />
            </IconButton>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-6">
          <DivisionPresentationSlide division={active} />
        </div>

        <div className="border-t border-white/10 px-4 py-3 md:px-6">
          <div className="flex flex-wrap items-center gap-2">
            {divisions.map((item, index) => {
              const activeSlide = index === currentIndex;
              return (
                <button
                  key={item.division.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    activeSlide
                      ? "border-blue-400/40 bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-white shadow-lg"
                      : "border-white/10 bg-white/[0.03] text-white/65 hover:bg-white/[0.06]"
                  }`}
                >
                  {item.division.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ExcoPresentationDialog;