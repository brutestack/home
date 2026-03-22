import { ProfileEstimate, ProfileType } from "../profile-estimate";
import {
  CEILING_H_MM, PN_H_MM,
  BATH_VERT_LEN_MM, BATH_VERT_STUD_POSITIONS
} from "../constants";

export function Estimate() {
  const studH = CEILING_H_MM - PN_H_MM * 2;

  const profiles: ProfileType[] = [
    {
      name: "ПН 100×40",
      cuts: [
        { length: BATH_VERT_LEN_MM, qty: 2 }, // пол + потолок
      ],
    },
    {
      name: "ПС 100×50",
      cuts: [
        { length: studH, qty: BATH_VERT_STUD_POSITIONS.length },
      ],
    },
  ];

  return <ProfileEstimate profiles={profiles} />;
}
