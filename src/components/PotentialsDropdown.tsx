import React, { useState } from "react";
import {
  PotentialFiveIcon,
  PotentialFourIcon,
  PotentialOneIcon,
  PotentialSixIcon,
  PotentialThreeIcon,
  PotentialTwoIcon,
} from "./icons/operatorStats";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Theme,
} from "@mui/material";
import { css } from "@emotion/react";

const PotentialMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  minHeight: "unset",
  "&.selected": {
    backgroundColor: theme.palette.midtoneBrighterer.main,
  },
  "& .MuiListItemIcon-root": {
    minWidth: "unset",
    marginRight: theme.spacing(1),
  },
  "& .MuiListItemText-root": {
    padding: theme.spacing(1, 0),
  },
  svg: {
    height: "18px",
    width: "18.9px",
    "path.no-potential": {
      fill: theme.palette.gray.main,
    },
  },
}));

const potentialToIcon = (potential: number) => {
  switch (potential) {
    case 0:
      return <PotentialOneIcon />;
    case 1:
      return <PotentialTwoIcon />;
    case 2:
      return <PotentialThreeIcon />;
    case 3:
      return <PotentialFourIcon />;
    case 4:
      return <PotentialFiveIcon />;
    case 5:
      return <PotentialSixIcon />;
  }
};

export interface PotentialsDropdownProps {
  potentialsToShow?: number[];
  handlePotentialChange: (pot: number) => void;
  currentPotential: number;
}
const PotentialsDropdown: React.FC<PotentialsDropdownProps> = (props) => {
  const {
    potentialsToShow,
    handlePotentialChange,
    currentPotential: potential,
  } = props;

  const potList = potentialsToShow ?? [0, 1, 2, 3, 4, 5]; // default to all pots

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPotentialsMenuOpen, setIsPotentialsMenuOpen] = useState(false);

  const handlePotentialsMenuClick: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    setAnchorEl(e.currentTarget);
    setIsPotentialsMenuOpen(true);
  };
  const handlePotentialsClick = (potential: number) => {
    handlePotentialChange(potential);
    setIsPotentialsMenuOpen(false);
  };

  return (
    <div className="potential-dropdown" css={styles}>
      <Button
        id="potentials-menu-button"
        variant="contained"
        aria-label="Select potential"
        aria-controls="potentials-menu"
        aria-haspopup="true"
        aria-expanded={isPotentialsMenuOpen ? "true" : undefined}
        onClick={handlePotentialsMenuClick}
      >
        {potentialToIcon(potential)}
        Potential {potential + 1}
      </Button>
      <Menu
        id="potentials-menu"
        open={isPotentialsMenuOpen}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "potentials-menu-button",
        }}
        onClose={() => setIsPotentialsMenuOpen(false)}
      >
        {potList.map((pot, i) => (
          <PotentialMenuItem key={i} onClick={() => handlePotentialsClick(pot)}>
            <ListItemIcon>{potentialToIcon(pot)}</ListItemIcon>
            <ListItemText>Potential {pot + 1}</ListItemText>
          </PotentialMenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default PotentialsDropdown;

const styles = (theme: Theme) => css`
  button {
    line-height: 23px;
    font-size: 18px;
    font-weight: 600;
    padding: ${theme.spacing(1, 1.5)};
    height: ${theme.spacing(5)};
  }

  svg {
    width: 18.9px;
    height: 18px;
    margin-right: ${theme.spacing(1)};

    path.no-potential {
      fill: ${theme.palette.gray.main};
    }
  }
`;
