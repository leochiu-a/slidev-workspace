import type { FC } from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BackgroundFrame } from "../components/BackgroundFrame";
import { FlowLine } from "../components/FlowLine";
import { colors, layout, shadow, typography } from "../theme/tokens";
import { bodyFont, titleFont } from "../theme/fonts";

type Repo = {
  name: string;
  subtitle: string;
  position: { x: number; y: number };
};

const repos: Repo[] = [
  {
    name: "tech-slides",
    subtitle: "slides 1",
    position: { x: -420, y: -120 },
  },
  {
    name: "product-updates",
    subtitle: "slides 2",
    position: { x: -420, y: 120 },
  },
  {
    name: "design-reviews",
    subtitle: "slides 3",
    position: { x: 420, y: 20 },
  },
];

const slideTargets = [
  { x: 0, y: -64 },
  { x: 0, y: 20 },
  { x: 0, y: 104 },
];

export const ValueOrganize: FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [0.9 * fps, 1.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const entryStart = 0.2 * fps;
  const entryDuration = 0.7 * fps;
  const entryStagger = 0.25 * fps;

  const workspaceStart = 1.6 * fps;
  const workspaceEnd = 2.2 * fps;
  const workspaceProgress = interpolate(frame, [workspaceStart, workspaceEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const morphStart = 2.3 * fps;
  const morphEnd = 3.9 * fps;
  const morphProgress = interpolate(frame, [morphStart, morphEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const outroStart = 4.35 * fps;
  const outroEnd = 4.9 * fps;
  const outroProgress = interpolate(frame, [outroStart, outroEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const outroOpacity = interpolate(outroProgress, [0, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outroLift = interpolate(outroProgress, [0, 1], [0, -24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const workspaceWidth = interpolate(morphProgress, [0, 1], [320, 440], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const workspaceHeight = interpolate(morphProgress, [0, 1], [200, 340], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const workspaceScale = interpolate(workspaceProgress, [0, 1], [0.86, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const workspaceLift = interpolate(workspaceProgress, [0, 1], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const workspaceOpacity = interpolate(workspaceProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stackGlow = interpolate(morphProgress, [0, 1], [0, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagInCardOpacity = interpolate(workspaceProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <BackgroundFrame
      style={{
        padding: layout.paddingY,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          opacity: outroOpacity,
          transform: `translateY(${outroLift}px)`,
        }}
      >
        <div
          style={{
            fontFamily: titleFont.fontFamily,
            fontSize: typography.subtitleSize,
            fontWeight: 600,
            opacity: textOpacity,
            textAlign: "center",
            color: colors.textStrong,
          }}
        >
          All your Slidev decks, organized.
        </div>
        <FlowLine width={540} thickness={6} delayMs={200} />
        <div style={{ position: "relative", width: 1320, height: 520 }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) translateY(${workspaceLift}px) scale(${workspaceScale})`,
              width: workspaceWidth,
              height: workspaceHeight,
              borderRadius: 32,
              border: `1px solid ${colors.borderStrong}`,
              backgroundColor: colors.card,
              boxShadow: shadow,
              padding: 22,
              boxSizing: "border-box",
              zIndex: 1,
              opacity: workspaceOpacity,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 12px",
                borderRadius: 999,
                backgroundColor: colors.cardWarm,
                border: `1px solid ${colors.border}`,
                fontFamily: bodyFont.fontFamily,
                fontSize: 16,
                color: colors.textStrong,
                opacity: tagInCardOpacity,
              }}
            >
              <Img
                src={staticFile("github.png")}
                alt="GitHub"
                style={{ width: 16, height: 16, opacity: 0.9 }}
              />
              slidev-workspace
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 520,
              height: 200,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(255, 183, 3, 0.25), transparent 70%)",
              opacity: stackGlow,
              filter: "blur(20px)",
            }}
          />

          {repos.map((repo, index) => {
            const entryProgress = interpolate(
              frame,
              [entryStart + index * entryStagger, entryStart + index * entryStagger + entryDuration],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }
            );
            const entryOffset = interpolate(entryProgress, [0, 1], [140, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const entryScale = interpolate(entryProgress, [0, 1], [0.94, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const entryOpacity = interpolate(entryProgress, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const target = slideTargets[index];
            const x = interpolate(morphProgress, [0, 1], [repo.position.x, target.x], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const y = interpolate(
              morphProgress,
              [0, 1],
              [repo.position.y + entryOffset, target.y],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );
            const width = interpolate(morphProgress, [0, 1], [280, 240], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const height = interpolate(morphProgress, [0, 1], [170, 70], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const radius = interpolate(morphProgress, [0, 1], [26, 18], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const tagInset = interpolate(morphProgress, [0, 1], [12, 20], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const tagWidth = interpolate(morphProgress, [0, 1], [200, width - 2 * tagInset], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const tagFontSize = interpolate(morphProgress, [0, 1], [15, 16], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const tagIconSize = interpolate(morphProgress, [0, 1], [18, 20], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const tagPaddingX = 14;
            const tagPaddingY = 6;
            const tagIconReserve = tagIconSize + 8;
            const tagHeightEstimate = interpolate(morphProgress, [0, 1], [40, 44], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const tagLeft = interpolate(morphProgress, [0, 1], [tagInset, width / 2], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const tagTop = interpolate(
              morphProgress,
              [0, 1],
              [tagInset, (height - tagHeightEstimate) / 2 + 4],
              {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              }
            );
            const tagTranslateX = interpolate(morphProgress, [0, 1], [0, -tagWidth / 2], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const tagIconCenterX = tagLeft + tagTranslateX + tagPaddingX + tagIconSize / 2;
            const tagIconCenterY = tagTop + tagPaddingY + tagIconSize / 2;
            const tagLogoFade = interpolate(morphProgress, [0.55, 1], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const logoSize = interpolate(morphProgress, [0, 1], [96, tagIconSize], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const logoX = interpolate(morphProgress, [0, 1], [width / 2, tagIconCenterX], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const logoY = interpolate(morphProgress, [0, 1], [height / 2 + 24, tagIconCenterY], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={repo.name}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${entryScale})`,
                  width,
                  height,
                  borderRadius: radius,
                  border: `1px solid ${colors.borderStrong}`,
                  backgroundColor: colors.card,
                  boxShadow: shadow,
                  padding: 16,
                  boxSizing: "border-box",
                  opacity: entryOpacity,
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: tagTop,
                    left: tagLeft,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: `${tagPaddingY}px ${tagPaddingX}px`,
                    width: morphProgress > 0.5 ? tagWidth : undefined,
                    borderRadius: 999,
                    backgroundColor: colors.cardWarm,
                    border: `1px solid ${colors.border}`,
                    transform: `translate(${tagTranslateX}px, 0px)`,
                    overflow: "hidden",
                  }}
                >
                  <Img
                    src={staticFile("github.png")}
                    alt="GitHub"
                    style={{
                      width: tagIconSize,
                      height: tagIconSize,
                      opacity: 0.9 * tagLogoFade,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: bodyFont.fontFamily,
                      fontSize: tagFontSize,
                      color: colors.textStrong,
                      letterSpacing: -0.2,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      paddingLeft: 0,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {repo.name}
                  </span>
                </div>

                <Img
                  src={staticFile("slidev-logo.png")}
                  alt="Slidev"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: logoSize,
                    height: logoSize,
                    opacity: entryOpacity,
                    transform: `translate(${logoX - logoSize / 2}px, ${logoY - logoSize / 2}px)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </BackgroundFrame>
  );
};
