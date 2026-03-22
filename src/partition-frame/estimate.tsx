import { ProfileEstimate, ProfileType } from "../profile-estimate";
import {
  BEDROOM_VERT_FULL_LEN_MM, CEILING_H_MM, PN_H_MM
} from "../constants";

export function Estimate() {
  const studH = CEILING_H_MM - PN_H_MM * 2;

  const profiles: ProfileType[] = [
    {
      name: "ПН 50×40",
      cuts: [
        { length: BEDROOM_VERT_FULL_LEN_MM, qty: 4 }, // пол + потолок × 2 слоя
      ],
    },
    {
      name: "ПН 75×40",
      cuts: [
        { length: BEDROOM_VERT_FULL_LEN_MM, qty: 2 }, // между слоями (пол + потолок)
      ],
    },
    {
      name: "ПС 50×50",
      cuts: [
        { length: studH, qty: 10 }, // 5 стоек × 2 слоя
      ],
    },
  ];

  return <ProfileEstimate profiles={profiles} />;
}
