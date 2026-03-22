import { ProfileEstimate, ProfileType } from "../profile-estimate";
import {
  CEILING_H_MM, PN_H_MM, PS_W_MM,
  BATH_HORIZ_LEN_MM, COL_W_MM, BATH_DOOR_END_MM,
  DOOR_W_MM, STUD_POSITIONS
} from "../constants";

export function Estimate() {
  const studH = CEILING_H_MM - PN_H_MM * 2;
  const pnFloorLen = COL_W_MM + BATH_HORIZ_LEN_MM - BATH_DOOR_END_MM;

  const profiles: ProfileType[] = [
    {
      name: "ПН 50×40",
      cuts: [
        { length: BATH_HORIZ_LEN_MM, qty: 2 },   // потолок × 2 слоя
        { length: pnFloorLen, qty: 2 },            // пол после проёма × 2 слоя
        { length: pnFloorLen, qty: 2 },            // стык ГКЛ × 2 слоя
        { length: DOOR_W_MM, qty: 2 },             // над дверью × 2 слоя
        { length: PS_W_MM, qty: 2 },               // пол у кол.2 × 2 слоя
      ],
    },
    {
      name: "ПН 75×40",
      cuts: [
        { length: BATH_HORIZ_LEN_MM, qty: 2 }, // между слоями
      ],
    },
    {
      name: "ПС 50×50",
      cuts: [
        { length: studH, qty: STUD_POSITIONS.length * 2 },
      ],
    },
  ];

  return <ProfileEstimate profiles={profiles} />;
}
