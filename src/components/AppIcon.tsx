import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  SvgProps,
} from 'react-native-svg';
import iconNodes from './iconData.json';

export type IconName =
  | 'book-open'
  | 'clipboard-list'
  | 'award'
  | 'smartphone'
  | 'cpu'
  | 'globe'
  | 'bot'
  | 'database'
  | 'shield'
  | 'search'
  | 'search-x'
  | 'x'
  | 'sun'
  | 'moon'
  | 'bell'
  | 'home'
  | 'user'
  | 'check'
  | 'clock'
  | 'teacher';

interface AppIconProps extends SvgProps {
  name: IconName | string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const TAG_MAP: Record<string, React.ComponentType<any>> = {
  path: Path,
  circle: Circle,
  rect: Rect,
  polyline: Polyline,
  line: Line,
  ellipse: Ellipse,
  polygon: Polygon,
};

const ICON_ALIAS: Record<string, string> = {
  home: 'house',
  shield: 'shield-check',
  teacher: 'graduation-cap',
};

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 20,
  color = '#1E293B',
  strokeWidth = 2,
  style,
  ...props
}) => {
  const resolvedName = ICON_ALIAS[name] || name;
  const nodes =
    ((iconNodes as unknown) as Record<string, [string, Record<string, any>][]>)[resolvedName] ||
    ((iconNodes as unknown) as Record<string, [string, Record<string, any>][]>)['book-open'];

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      {...props}
    >
      {nodes.map(([tag, attrs], index) => {
        const Component = TAG_MAP[tag];
        if (!Component) return null;
        const { key, ...restAttrs } = attrs;
        return <Component key={key || index} {...restAttrs} />;
      })}
    </Svg>
  );
};
