import { ProfileEstimate, ProfileType } from "../profile-estimate";
import {
  BEDROOM_VERT_FULL_LEN_MM, CEILING_H_MM, PN_H_MM,
  GKL_DOOR_STUD_LEFT_MID_MM, STUD_POSITIONS_GKL
} from "../constants";

export function Estimate() {
  const studH = CEILING_H_MM - PN_H_MM * 2;
  const overDoorLen = BEDROOM_VERT_FULL_LEN_MM - GKL_DOOR_STUD_LEFT_MID_MM;

  const profiles: ProfileType[] = [
    {
      name: "ПН 50×40",
      cuts: [
        { length: BEDROOM_VERT_FULL_LEN_MM, qty: 4 },    // пол + потолок × 2 слоя
        { length: overDoorLen, qty: 2 },                    // над дверью × 2 слоя
        { length: GKL_DOOR_STUD_LEFT_MID_MM, qty: 2 },    // стык ГКЛ × 2 слоя
      ],
    },
    {
      name: "ПН 75×40",
      cuts: [
        { length: BEDROOM_VERT_FULL_LEN_MM, qty: 2 }, // между слоями
      ],
    },
    {
      name: "ПС 50×50",
      cuts: [
        { length: studH, qty: STUD_POSITIONS_GKL.length * 2 },
      ],
    },
  ];

  return <ProfileEstimate profiles={profiles} />;
}
