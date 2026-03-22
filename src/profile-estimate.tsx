import { C_BG_SVG, C_TEXT, C_TEXT_DIM, C_COLUMN_TEXT, C_DIM } from "./colors";

const PROFILE_LENGTH = 3000; // Стандартная длина профиля (мм)

export interface ProfileCut {
  length: number; // мм
  qty: number;
}

export interface ProfileType {
  name: string;
  cuts: ProfileCut[];
}

interface Bin {
  pieces: number[];
  remaining: number;
}

// First Fit Decreasing — оптимальный раскрой
function packCuts(cuts: ProfileCut[]): { bins: Bin[]; waste: number } {
  const pieces: number[] = [];
  for (const cut of cuts) {
    for (let i = 0; i < cut.qty; i++) {
      pieces.push(cut.length);
    }
  }

  pieces.sort((a, b) => b - a);

  const bins: Bin[] = [];

  for (const piece of pieces) {
    let bestIdx = -1;
    let bestRemaining = PROFILE_LENGTH + 1;

    for (let i = 0; i < bins.length; i++) {
      if (bins[i].remaining >= piece && bins[i].remaining < bestRemaining) {
        bestIdx = i;
        bestRemaining = bins[i].remaining;
      }
    }

    if (bestIdx >= 0) {
      bins[bestIdx].pieces.push(piece);
      bins[bestIdx].remaining -= piece;
    } else {
      bins.push({ pieces: [piece], remaining: PROFILE_LENGTH - piece });
    }
  }

  const waste = bins.reduce((sum, b) => sum + b.remaining, 0);
  return { bins, waste };
}

interface ProfileEstimateProps {
  title?: string;
  profiles: ProfileType[];
}

export function ProfileEstimate({ title = "Смета профилей (раскрой из 3 м)", profiles }: ProfileEstimateProps) {
  const results = profiles.map(p => ({
    name: p.name,
    ...packCuts(p.cuts),
  }));

  return (
    <div style={{ background: C_BG_SVG, borderRadius: 8, padding: 16, maxWidth: 750, marginTop: 16 }}>
      <h3 style={{ color: C_COLUMN_TEXT, margin: "0 0 12px", fontSize: 14 }}>{title}</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C_TEXT_DIM}` }}>
            <th style={{ textAlign: "left", padding: "8px 4px", color: C_TEXT }}>Профиль</th>
            <th style={{ textAlign: "center", padding: "8px 4px", color: C_TEXT }}>Купить</th>
            <th style={{ textAlign: "left", padding: "8px 4px", color: C_TEXT }}>Раскрой</th>
            <th style={{ textAlign: "right", padding: "8px 4px", color: C_TEXT }}>Отход</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C_TEXT_DIM}33`, verticalAlign: "top" }}>
              <td style={{ padding: "6px 4px", color: C_DIM, fontWeight: "bold" }}>{r.name}</td>
              <td style={{ padding: "6px 4px", color: C_TEXT, textAlign: "center", fontWeight: "bold", fontSize: 14 }}>
                {r.bins.length} шт
              </td>
              <td style={{ padding: "6px 4px", color: C_TEXT_DIM, fontSize: 10, lineHeight: 1.6 }}>
                {r.bins.map((bin, j) => (
                  <div key={j}>
                    <span style={{ color: C_DIM }}>#{j + 1}:</span>{" "}
                    {bin.pieces.join(" + ")} = {bin.pieces.reduce((a, b) => a + b, 0)}{" "}
                    <span style={{ color: C_TEXT_DIM }}>({bin.remaining} ост.)</span>
                  </div>
                ))}
              </td>
              <td style={{ padding: "6px 4px", color: C_TEXT_DIM, textAlign: "right" }}>
                {r.waste} мм
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ color: C_TEXT_DIM, fontSize: 11, marginTop: 10, borderTop: `1px solid ${C_TEXT_DIM}33`, paddingTop: 8 }}>
        <strong style={{ color: C_DIM }}>Итого купить:</strong>
        {results.map((r, i) => (
          <span key={i}>
            {i > 0 ? " | " : " "}
            {r.name}: <strong style={{ color: C_TEXT }}>{r.bins.length} шт</strong>
          </span>
        ))}
      </div>
    </div>
  );
}
