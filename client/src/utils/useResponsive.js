import { useState, useEffect, useCallback } from 'react';

export const defaultBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1280,
  xl: 1920,
};

const useResponsive = (breakpoints = defaultBreakpoints) => {
  const sizes = Object.entries(breakpoints).sort((a, b) => b[1] - a[1]);
  if (sizes[sizes.length - 1][1] !== 0) {
    sizes[sizes.length - 1][1] = 0;
  }
  const getScreen = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const size = sizes.filter((x) => x[1] <= width)[0][0];
    const orientation = width > window.innerHeight ? 'landscape' : 'portrait';

    return {
      width,
      height,
      size,
      orientation,
      screenIsUp(breakpoint, andOrientation) {
        return (
          width >= breakpoints[breakpoint] &&
          (!andOrientation || andOrientation === orientation)
        );
      },
      screenIsDown(breakpoint, andOrientation) {
        return (
          width < breakpoints[breakpoint] &&
          (!andOrientation || andOrientation === orientation)
        );
      },
    };
  }, [breakpoints, sizes]);

  const [screen, setScreen] = useState(getScreen());

  useEffect(() => {
    const onResize = () => {
      const current = getScreen();

      if (
        current.size !== screen.size ||
        current.orientation !== screen.orientation ||
        current.width !== screen.width ||
        current.height !== screen.height
      ) {
        setScreen(current);
      }
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [screen, setScreen, getScreen]);

  return screen;
};

export default useResponsive;
