import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Search,
  NotificationsNone,
  KeyboardArrowDown,
  TrendingUp,
  CalendarMonth,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { line, panel2, purple, softText, white } from "../../theme/dashboardTokens";
import {
  selectDashboardNotificationsOpen,
  selectDashboardPeriod,
  selectDashboardSearchQuery,
} from "../../features/executiveDashboard/executiveDashboardSelectors";
import {
  setPeriod,
  setSearchQuery,
  toggleNotifications,
} from "../../features/executiveDashboard/executiveDashboardSlice";

const periodOptions = [
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_30_days", label: "Last 30 days" },
  { value: "this_quarter", label: "This quarter" },
  { value: "this_year", label: "This year" },
];

const TopHeader = () => {
  const { user, switchRole } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchQuery = useSelector(selectDashboardSearchQuery);
  const period = useSelector(selectDashboardPeriod);
  const notificationsOpen = useSelector(selectDashboardNotificationsOpen);

  const [periodAnchorEl, setPeriodAnchorEl] = React.useState(null);

  const activePeriodLabel =
    periodOptions.find((item) => item.value === period)?.label || "Last 30 days";

  const roleRoutes = {
    department: "/department/periods",
    supervisor: "/supervisor/queue",
    division: "/division/overview/current",
    strategy: "/strategy/publish",
    ceo: "/ceo/dashboard",
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(8,17,31,0.82)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${line}`,
        color: white,
      }}
    >
      <Box sx={{ px: { xs: 2, md: 3, xl: 4 }, py: 2.25 }}>
        <Box className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Box className="flex items-center gap-4">
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 4,
                background: "linear-gradient(135deg, #4f8cff 0%, #8b5cf6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 30px rgba(79,140,255,0.35)",
              }}
            >
              <TrendingUp sx={{ color: "white" }} />
            </Box>

            <Box>
              <Typography sx={{ fontSize: 22, fontWeight: 900 }}>
                Elegant KPI Dashboard
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: softText }}>
                CEO Executive Overview
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-1 items-center justify-end gap-3">
            <Paper
              elevation={0}
              className="hidden md:flex items-center gap-2 rounded-full px-4 py-2"
              sx={{ bgcolor: panel2, border: `1px solid ${line}`, minWidth: 280 }}
            >
              <Search sx={{ fontSize: 18, color: softText }} />
              <InputBase
                placeholder="Search dashboards..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                sx={{ color: white, fontSize: 13.5, width: "100%" }}
              />
            </Paper>

            <Select
              size="small"
              value={user.role}
              onChange={(e) => {
                const newRole = e.target.value;
                switchRole(newRole);
                navigate(roleRoutes[newRole], { replace: true });
              }}
              sx={{
                minWidth: 140,
                bgcolor: "rgba(255,255,255,0.06)",
                color: "#fff",
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSvgIcon-root": {
                  color: "#fff",
                },
              }}
            >
              <MenuItem value="department">Department</MenuItem>
              <MenuItem value="supervisor">Supervisor</MenuItem>
              <MenuItem value="division">Division</MenuItem>
              <MenuItem value="strategy">Strategy</MenuItem>
              <MenuItem value="ceo">CEO</MenuItem>
            </Select>

            <Chip
              icon={<CalendarMonth sx={{ color: `${softText} !important` }} />}
              label={activePeriodLabel}
              sx={{
                bgcolor: panel2,
                color: white,
                border: `1px solid ${line}`,
                height: 42,
              }}
              deleteIcon={<KeyboardArrowDown />}
              onDelete={(e) => setPeriodAnchorEl(e.currentTarget)}
              onClick={(e) => setPeriodAnchorEl(e.currentTarget)}
            />

            <Menu
              anchorEl={periodAnchorEl}
              open={Boolean(periodAnchorEl)}
              onClose={() => setPeriodAnchorEl(null)}
              PaperProps={{
                sx: {
                  bgcolor: panel2,
                  color: white,
                  border: `1px solid ${line}`,
                  mt: 1,
                  minWidth: 180,
                },
              }}
            >
              {periodOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  selected={option.value === period}
                  onClick={() => {
                    dispatch(setPeriod(option.value));
                    setPeriodAnchorEl(null);
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>

            <Tooltip title="Notifications">
              <IconButton
                onClick={() => dispatch(toggleNotifications())}
                sx={{
                  bgcolor: notificationsOpen ? "rgba(139,92,246,0.15)" : panel2,
                  color: white,
                  border: `1px solid ${line}`,
                }}
              >
                <NotificationsNone />
              </IconButton>
            </Tooltip>

            <Box
              className="flex items-center gap-3 rounded-full px-2.5 py-1.5"
              sx={{ bgcolor: panel2, border: `1px solid ${line}` }}
            >
              <Avatar sx={{ width: 34, height: 34, bgcolor: purple }}>
                {user?.name?.[0] || "A"}
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 800 }}>
                  {user?.name || "Admin User"}
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: softText }}>
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Executive"}
                </Typography>
              </Box>
              <KeyboardArrowDown sx={{ color: softText }} />
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 1.5, display: { xs: "block", md: "none" } }}>
          <Paper
            elevation={0}
            className="flex items-center gap-2 rounded-full px-4 py-2"
            sx={{ bgcolor: panel2, border: `1px solid ${line}` }}
          >
            <Search sx={{ fontSize: 18, color: softText }} />
            <InputBase
              placeholder="Search dashboards..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              sx={{ color: white, fontSize: 13.5, width: "100%" }}
            />
          </Paper>
        </Box>
      </Box>
    </AppBar>
  );
};

export default TopHeader;