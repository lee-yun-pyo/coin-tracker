import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    grayText: string;
    divColor: string;
    accentColor: string;
    grayDiv: string;
  }
}