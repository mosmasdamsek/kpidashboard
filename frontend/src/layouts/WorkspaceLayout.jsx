import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { navigationByRole, roleDisplayNames } from "../config/navigationConfig";
import { bg, line, panel, panel2, softText, white, blue } from "../theme/dashboardTokens";
import PageHeader from "../components/common/PageHeader";
import { MenuItem, Select } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const WorkspaceLayout = ({
  role,
  title,
  subtitle,
  actions,
  headerBadge,
  children,
}) => {
  const navItems = navigationByRole[role] || [];
  const roleName = roleDisplayNames[role] || "Workspace";

  const { user, switchRole } = useAuth();

  const navigate = useNavigate();

  const roleRoutes = {
    department: "/department/periods",
    supervisor: "/supervisor/queue",
    division: "/division/overview/current",
    strategy: "/strategy/publish",
    ceo: "/ceo/dashboard",
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: bg, color: white, display: "flex" }}>
      <Box
        sx={{
          width: 270,
          bgcolor: panel,
          borderRight: `1px solid ${line}`,
          p: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: panel2,
            border: `1px solid ${line}`,
            mb: 3,
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 900 }}>
            Performance Hub
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: softText, mt: 0.5 }}>
            {roleName}
          </Typography>

          <Chip
            label={role}
            size="small"
            sx={{
              mt: 1.5,
              bgcolor: "rgba(79,140,255,0.12)",
              color: "#93c5fd",
              border: "1px solid rgba(79,140,255,0.2)",
              textTransform: "capitalize",
              fontWeight: 800,
            }}
          />
          <Select
            size="small"
            value={user.role}
            onChange={(e) => {
              const newRole = e.target.value;
              switchRole(newRole);
              navigate(roleRoutes[newRole], { replace: true });
            }}
            sx={{
              mt: 1.5,
              minWidth: "100%",
              bgcolor: "rgba(255,255,255,0.04)",
              color: white,
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSvgIcon-root": {
                color: white,
              },
            }}
          >
            <MenuItem value="department">Department</MenuItem>
            <MenuItem value="supervisor">Supervisor</MenuItem>
            <MenuItem value="division">Division</MenuItem>
            <MenuItem value="strategy">Strategy</MenuItem>
            <MenuItem value="ceo">CEO</MenuItem>
          </Select>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? white : softText,
                background: isActive
                  ? "linear-gradient(135deg, rgba(79,140,255,0.18) 0%, rgba(139,92,246,0.14) 100%)"
                  : "transparent",
                border: `1px solid ${
                  isActive ? "rgba(79,140,255,0.22)" : "transparent"
                }`,
                borderRadius: "14px",
                padding: "12px 14px",
                fontWeight: 700,
                boxShadow: isActive ? "0 8px 24px rgba(79,140,255,0.12)" : "none",
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </Box>

        <Box sx={{ mt: "auto", pt: 3 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.02)",
              border: `1px solid ${line}`,
            }}
          >
            <Typography sx={{ fontSize: 12.5, color: softText }}>
              Workspace Status
            </Typography>
            <Typography sx={{ fontWeight: 800, mt: 0.75 }}>
              Active Session
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: softText, mt: 0.5 }}>
              Role-based workflow pages are now connected under one shell.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, p: 3 }}>
        <Box
          className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"
          sx={{ mb: 3 }}
        >
          <PageHeader title={title} subtitle={subtitle} actions={actions} />

          {headerBadge ? (
            <Box sx={{ flexShrink: 0 }}>{headerBadge}</Box>
          ) : null}
        </Box>

        <Box
          sx={{
            minHeight: "calc(100vh - 120px)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default WorkspaceLayout;