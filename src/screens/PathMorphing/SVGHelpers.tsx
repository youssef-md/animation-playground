import Animated from 'react-native-reanimated';
import { string } from 'react-native-redash';

const { concat, interpolate } = Animated;

enum SVGCommand {
  MOVE,
  CURVE,
  CLOSE,
}

interface Move {
  type: SVGCommand.MOVE;
  x: Animated.Adaptable<number>;
  y: Animated.Adaptable<number>;
}

interface Point {
  x: Animated.Adaptable<number>;
  y: Animated.Adaptable<number>;
}

interface Curve {
  type: SVGCommand.CURVE;
  to: Point;
  c1: Point;
  c2: Point;
}

interface Close {
  type: SVGCommand.CLOSE;
}

type SVGSegment = Close | Curve | Move;

export const exhaustiveCheck = (command: never): never => {
  throw new TypeError(`Unknown SVG Command: ${command}`);
};

const serializeMove = (c: Move) => string`M${c.x},${c.y} `;
const serializeClose = () => string`Z`;
const serializeCurve = (c: Curve) =>
  string`C${c.c1.x},${c.c1.y} ${c.c2.x},${c.c2.y} ${c.to.x},${c.to.y} `;

const isMove = (command: SVGSegment): command is Move =>
  command.type === SVGCommand.MOVE;

const isCurve = (command: SVGSegment): command is Curve =>
  command.type === SVGCommand.CURVE;

const isClose = (command: SVGSegment): command is Close =>
  command.type === SVGCommand.CLOSE;

export const serialize = (path: SVGSegment[]) => {
  return path
    .map((segment) => {
      if (isMove(segment)) {
        return serializeMove(segment);
      }
      if (isCurve(segment)) {
        return serializeCurve(segment);
      }
      if (isClose(segment)) {
        return serializeClose();
      }
      return exhaustiveCheck(segment);
    })
    .reduce((acc, c) => concat(acc, c));
};

export const serializeString = (path: SVGSegment[]) => {
  return path
    .map((segment) => {
      if (isMove(segment)) {
        return `M${segment.x},${segment.y} `;
      }
      if (isCurve(segment)) {
        return `C${segment.c1.x},${segment.c1.y} ${segment.c2.x},${segment.c2.y} ${segment.to.x},${segment.to.y} `;
      }
      if (isClose(segment)) {
        return 'Z';
      }
      return exhaustiveCheck(segment);
    })
    .reduce((acc, c) => `${acc}${c}`);
};

interface PathInterpolation<T extends readonly number[]> {
  inputRange: T;
  outputRange: { [K in keyof T]: SVGSegment[] };
}

export const interpolatePath = <T extends readonly number[]>(
  value: Animated.Node<number>,
  { inputRange, outputRange }: PathInterpolation<T>,
) => {
  const path = outputRange[0].map((segment, index) => {
    if (isMove(segment)) {
      const points = outputRange.map((p) => {
        const s = p[index];
        if (isMove(s)) {
          return {
            x: s.x,
            y: s.y,
          };
        }
        throw new Error('Paths to interpolate are not symetrical');
      });
      return {
        type: SVGCommand.MOVE,
        x: interpolate(value, {
          inputRange,
          outputRange: points.map((p) => p.x),
        }),
        y: interpolate(value, {
          inputRange,
          outputRange: points.map((p) => p.y),
        }),
      } as Move;
    }
    if (isCurve(segment)) {
      const curves = outputRange.map((p) => {
        const s = p[index];
        if (isCurve(s)) {
          return {
            to: s.to,
            c1: s.c1,
            c2: s.c2,
          };
        }
        throw new Error('Paths to interpolate are not symetrical');
      });
      return {
        type: SVGCommand.CURVE,
        to: {
          x: interpolate(value, {
            inputRange,
            outputRange: curves.map((c) => c.to.x),
          }),
          y: interpolate(value, {
            inputRange,
            outputRange: curves.map((c) => c.to.y),
          }),
        },
        c1: {
          x: interpolate(value, {
            inputRange,
            outputRange: curves.map((c) => c.c1.x),
          }),
          y: interpolate(value, {
            inputRange,
            outputRange: curves.map((c) => c.c1.y),
          }),
        },
        c2: {
          x: interpolate(value, {
            inputRange,
            outputRange: curves.map((c) => c.c2.x),
          }),
          y: interpolate(value, {
            inputRange,
            outputRange: curves.map((c) => c.c2.y),
          }),
        },
      } as Curve;
    }
    return segment;
  });
  return serialize(path);
};

export const createSVGPath = (): SVGSegment[] => [];

export const moveTo = (commands: SVGSegment[], x: number, y: number) => {
  commands.push({ type: SVGCommand.MOVE, x, y } as Move);
};

export const curveTo = (commands: SVGSegment[], c: Omit<Curve, 'type'>) => {
  commands.push({ type: SVGCommand.CURVE, ...c });
};

export const close = (commands: SVGSegment[]) => {
  commands.push({ type: SVGCommand.CLOSE });
};
