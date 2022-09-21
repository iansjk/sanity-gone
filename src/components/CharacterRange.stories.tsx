import { Meta, Story } from "@storybook/react";
import CharacterRange, { CharacterRangeProps } from "./CharacterRange";

export default {
  title: "Introduction/CharacterRange",
  component: CharacterRange,
} as Meta;

const Template: Story<CharacterRangeProps> = (args) => (
  <CharacterRange {...args} />
);
export const Cuora = Template.bind({});
Cuora.args = {
  rangeObject: {
    id: "0-1",
    direction: 1,
    grids: [
      {
        row: 0,
        col: 0,
      },
    ],
  },
};
export const Mudrock = Template.bind({});
Mudrock.args = {
  rangeObject: {
    id: "1-1",
    direction: 1,
    grids: [
      {
        row: 0,
        col: 0,
      },
      {
        row: 0,
        col: 1,
      },
    ],
  },
};
export const IfritE2 = Template.bind({});
IfritE2.args = {
  rangeObject: {
    id: "5-1",
    direction: 1,
    grids: [
      {
        row: 0,
        col: 0,
      },
      {
        row: 0,
        col: 1,
      },
      {
        row: 0,
        col: 2,
      },
      {
        row: 0,
        col: 3,
      },
      {
        row: 0,
        col: 4,
      },
      {
        row: 0,
        col: 5,
      },
    ],
  },
};

export const EyjaS3 = Template.bind({});
EyjaS3.args = {
  rangeObject: {
    id: "x-3",
    direction: 1,
    grids: [
      {
        row: 3,
        col: 0,
      },
      {
        row: 2,
        col: -1,
      },
      {
        row: 2,
        col: 0,
      },
      {
        row: 2,
        col: 1,
      },
      {
        row: 1,
        col: -2,
      },
      {
        row: 1,
        col: -1,
      },
      {
        row: 1,
        col: 0,
      },
      {
        row: 1,
        col: 1,
      },
      {
        row: 1,
        col: 2,
      },
      {
        row: 0,
        col: -3,
      },
      {
        row: 0,
        col: -2,
      },
      {
        row: 0,
        col: -1,
      },
      {
        row: 0,
        col: 0,
      },
      {
        row: 0,
        col: 1,
      },
      {
        row: 0,
        col: 2,
      },
      {
        row: 0,
        col: 3,
      },
      {
        row: -1,
        col: -2,
      },
      {
        row: -1,
        col: -1,
      },
      {
        row: -1,
        col: 0,
      },
      {
        row: -1,
        col: 1,
      },
      {
        row: -1,
        col: 2,
      },
      {
        row: -2,
        col: -1,
      },
      {
        row: -2,
        col: 0,
      },
      {
        row: -2,
        col: 1,
      },
      {
        row: -3,
        col: 0,
      },
    ],
  },
};

export const RosaE2 = Template.bind({});
RosaE2.args = {
  rangeObject: {
    id: "4-3",
    direction: 1,
    grids: [
      {
        row: 2,
        col: 2,
      },
      {
        row: 2,
        col: 3,
      },
      {
        row: 1,
        col: 2,
      },
      {
        row: 1,
        col: 3,
      },
      {
        row: 1,
        col: 4,
      },
      {
        row: 0,
        col: 2,
      },
      {
        row: 0,
        col: 3,
      },
      {
        row: 0,
        col: 4,
      },
      {
        row: -1,
        col: 2,
      },
      {
        row: -1,
        col: 3,
      },
      {
        row: -1,
        col: 4,
      },
      {
        row: -2,
        col: 2,
      },
      {
        row: -2,
        col: 3,
      },
    ],
  },
};

export const KafkaS2 = Template.bind({});
KafkaS2.args = {
  rangeObject: {
    id: "3-16",
    direction: 1,
    grids: [
      {
        row: 0,
        col: 3,
      },
    ],
  },
};

export const AmbrielS1E0 = Template.bind({});
AmbrielS1E0.args = {
  rangeObject: {
    id: "3-3",
    direction: 1,
    grids: [
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 0,
        "col": 3
      },
      {
        "row": -1,
        "col": 0
      },
      {
        "row": -1,
        "col": 1
      },
      {
        "row": -1,
        "col": 2
      },
      {
        "row": -1,
        "col": 3
      }
    ],
  },
    forwardExtend: 1,
}

export const AmbrielS1E1 = Template.bind({});
AmbrielS1E1.args = {
  rangeObject: {
    id: "3-9",
    direction: 1,
    grids: [
      {
        "row": 2,
        "col": 0
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 0,
        "col": 3
      },
      {
        "row": 0,
        "col": 4
      },
      {
        "row": -1,
        "col": 0
      },
      {
        "row": -1,
        "col": 1
      },
      {
        "row": -1,
        "col": 2
      },
      {
        "row": -1,
        "col": 3
      },
      {
        "row": -2,
        "col": 0
      },
      {
        "row": -2,
        "col": 1
      },
      {
        "row": -2,
        "col": 2
      }
    ],
  },
  forwardExtend: 1,
}

export const SurtrS3 = Template.bind({});
SurtrS3.args = {
  rangeObject: {
    id: "1-1",
    direction: 1,
    grids: [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 0,
        "col": 1
      }
    ],
  },
  forwardExtend: 2,
}

export const AnselE0S1 = Template.bind({});
AnselE0S1.args = {
  rangeObject: {
    id: "3-1",
    direction: 1,
    grids: [
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 0,
        "col": 3
      },
      {
        "row": -1,
        "col": 0
      },
      {
        "row": -1,
        "col": 1
      },
      {
        "row": -1,
        "col": 2
      }
    ],
  },
  forwardExtend: 2,
}

export const ArchettoE0S3 = Template.bind({});
ArchettoE0S3.args = {
  rangeObject: {
    id: "3-1",
    direction: 1,
    grids: [
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 1,
        "col": 1
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 0,
        "col": 1
      },
      {
        "row": 0,
        "col": 2
      },
      {
        "row": 0,
        "col": 3
      },
      {
        "row": -1,
        "col": 0
      },
      {
        "row": -1,
        "col": 1
      },
      {
        "row": -1,
        "col": 2
      }
    ],
  },
  forwardExtend: 2,
}

export const CrabRange = Template.bind({});
CrabRange.args = {
  rangeObject: {
    id: "crab",
    direction: 1,
    grids: [
      {
        "row": 0,
        "col": 0
      },
      {
        "row": 1,
        "col": 0
      },
      {
        "row": 2,
        "col": 0
      },
      {
        "row": -1,
        "col": 0
      },
      {
        "row": -2,
        "col": 0
      },
      {
        "row": 2,
        "col": 1
      },
      {
        "row": -2,
        "col": 1
      },
      {
        "row": 3,
        "col": 2
      },
      {
        "row": 2,
        "col": 2
      },
      {
        "row": 1,
        "col": 2
      },
      {
        "row": -3,
        "col": 2
      },
      {
        "row": -2,
        "col": 2
      },
      {
        "row": -1,
        "col": 2
      },
      {
        "row": 3,
        "col": 3
      },
      {
        "row": 1,
        "col": 3
      },
      {
        "row": -3,
        "col": 3
      },
      {
        "row": -1,
        "col": 3
      },
    ]
  }
}