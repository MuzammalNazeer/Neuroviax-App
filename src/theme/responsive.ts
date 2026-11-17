import { useWindowDimensions } from 'react-native';

export interface ResponsiveState {
  width: number;
  height: number;
  isSmallMobile: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  numColumns: number;
  contentMaxWidth: number | '100%';
  authMaxWidth: number;
  horizontalPadding: number;
}

export const useResponsive = (): ResponsiveState => {
  const { width, height } = useWindowDimensions();

  const isSmallMobile = width < 375;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const numColumns = isDesktop ? 4 : isTablet ? 3 : 2;
  const contentMaxWidth = isDesktop ? 1240 : isTablet ? 840 : '100%';
  const authMaxWidth = 480;
  const horizontalPadding = isSmallMobile ? 12 : isMobile ? 16 : 28;

  return {
    width,
    height,
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop,
    numColumns,
    contentMaxWidth,
    authMaxWidth,
    horizontalPadding,
  };
};

export const responsiveLayout = {
  authContainer: {
    width: '100%' as const,
    maxWidth: 480,
    alignSelf: 'center' as const,
  },
  mainContainer: {
    width: '100%' as const,
    maxWidth: 1240,
    alignSelf: 'center' as const,
  },
  modalContainer: {
    width: '100%' as const,
    maxWidth: 520,
    alignSelf: 'center' as const,
  },
};
