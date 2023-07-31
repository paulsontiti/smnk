import * as React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SmnkErrorBoundary } from "@/pages/_app";

export interface MenuAction {
  label: string;
  disabled?: boolean;
  handleClick: () => void;
}

const ActionsMenuComponent = React.forwardRef(
  ({ menuActions }: { menuActions: MenuAction[] }, _ref) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    React.useImperativeHandle(_ref, () => ({
      handleClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      },
    }));
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <SmnkErrorBoundary>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {menuActions.map((menu, i) => (
            <MenuItem
              key={i}
              onClick={() => {
                menu.handleClick();
                handleClose();
              }}
              disabled={menu.disabled}
            >
              {menu.label}
            </MenuItem>
          ))}
        </Menu>
      </SmnkErrorBoundary>
    );
  }
);
ActionsMenuComponent.displayName = "ActionsMenuComponent";

export default ActionsMenuComponent;
